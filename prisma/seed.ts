import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

type SanityDoc = {
  _id: string;
  _type: string;
  name?: string;
  slug?: { current?: string };
  description?: string;
  price?: number;
  order?: number;
  featured?: boolean;
  isNew?: boolean;
  isVeg?: boolean;
  size?: string;
  image?: { _sanityAsset?: string };
};

type CategoryConfig = {
  name: string;
  slug: string;
  icon: string | null;
};

const prisma = new PrismaClient();
const EXPORT_FOLDER_NAME = "production-export-2026-02-15t00-38-27-315z";

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  pizza: { name: "Pizzas", slug: "pizza", icon: "pizza" },
  bread: { name: "Panes", slug: "panes", icon: "pastel" },
  drink: { name: "Bebidas", slug: "bebidas", icon: "cafe" },
  wine: { name: "Vinos", slug: "vinos", icon: null },
  dessert: { name: "Postres", slug: "postres", icon: "dona" },
};

const MENU_TYPES = new Set(["pizza", "bread", "drink", "wine", "dessert"]);
const FALLBACK_IMAGE = "placeholder.svg";

function resolveExportDir() {
  const candidates = [
    path.join(process.cwd(), EXPORT_FOLDER_NAME),
    path.join(process.cwd(), "public", EXPORT_FOLDER_NAME),
  ];

  const directory = candidates.find((candidate) => fs.existsSync(candidate));

  if (!directory) {
    throw new Error(
      `No se encontro la carpeta de export '${EXPORT_FOLDER_NAME}' en el workspace`
    );
  }

  return directory;
}

function readNdjson(filePath: string): SanityDoc[] {
  const content = fs.readFileSync(filePath, "utf8").trim();
  if (!content) return [];
  return content
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line) as SanityDoc);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getMenuType(doc: SanityDoc) {
  const name = doc.name?.toLowerCase().trim() ?? "";
  if (name.includes("tiramisu")) return "dessert";
  return doc._type;
}

function extractImageFileName(doc: SanityDoc) {
  const sanityAsset = doc.image?._sanityAsset ?? "";
  if (!sanityAsset) return null;
  const match = sanityAsset.match(/\/images\/([^/]+)$/);
  return match?.[1] ?? null;
}

function ensurePlaceholderImage(productsDir: string) {
  const placeholderTarget = path.join(productsDir, FALLBACK_IMAGE);
  const mutzLogoSource = path.join(process.cwd(), "public", "mutz-logo.svg");
  const defaultLogoSource = path.join(process.cwd(), "public", "logo.svg");

  if (fs.existsSync(placeholderTarget)) return;

  if (fs.existsSync(mutzLogoSource)) {
    fs.copyFileSync(mutzLogoSource, placeholderTarget);
    return;
  }

  if (fs.existsSync(defaultLogoSource)) {
    fs.copyFileSync(defaultLogoSource, placeholderTarget);
    return;
  }

  fs.writeFileSync(
    placeholderTarget,
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#F5F1E6" font-size="32" text-anchor="middle" dominant-baseline="middle">Mutz</text></svg>`,
    "utf8"
  );
}

async function main() {
  const exportDir = resolveExportDir();
  const dataFile = path.join(exportDir, "data.ndjson");
  const imagesSourceDir = path.join(exportDir, "images");
  const productsDir = path.join(process.cwd(), "public", "products");

  if (!fs.existsSync(dataFile)) {
    throw new Error(`No existe data.ndjson en ${exportDir}`);
  }

  fs.mkdirSync(productsDir, { recursive: true });
  ensurePlaceholderImage(productsDir);

  const docs = readNdjson(dataFile);

  const menuDocs = docs.filter((doc) => {
    if (!MENU_TYPES.has(doc._type)) return false;
    if (doc._id.startsWith("drafts.")) return false;
    if (typeof doc.name !== "string" || !doc.name.trim()) return false;
    if (typeof doc.price !== "number" || Number.isNaN(doc.price)) return false;
    return true;
  });

  const usedTypes = new Set<string>();
  const missingImages: string[] = [];

  const productsData = menuDocs.map((doc, index) => {
    const menuType = getMenuType(doc);
    if (!CATEGORY_CONFIG[menuType]) {
      throw new Error(`Tipo de menu no soportado: ${menuType} (${doc._id})`);
    }

    usedTypes.add(menuType);

    const imageFileName = extractImageFileName(doc);
    let image = FALLBACK_IMAGE;

    if (imageFileName) {
      const source = path.join(imagesSourceDir, imageFileName);
      const destination = path.join(productsDir, imageFileName);

      if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        image = imageFileName;
      } else {
        missingImages.push(`${doc.name ?? doc._id} -> ${imageFileName}`);
      }
    } else {
      missingImages.push(`${doc.name ?? doc._id} -> sin referencia de imagen`);
    }

    const fallbackSlug = slugify(doc.name ?? `item-${index + 1}`);
    const sourceSlug = doc.slug?.current ? slugify(doc.slug.current) : "";

    return {
      sanityId: doc._id,
      name: doc.name!.trim(),
      slug: sourceSlug || fallbackSlug,
      description: doc.description?.trim() || null,
      price: doc.price!,
      image,
      menuType,
      displayOrder: typeof doc.order === "number" ? doc.order : 999,
      featured: Boolean(doc.featured),
      isNew: Boolean(doc.isNew),
      isVeg: Boolean(doc.isVeg),
      size: doc.size?.trim() || null,
      categoryType: menuType,
    };
  });

  const categoriesData = Array.from(usedTypes).map((type) => {
    const cfg = CATEGORY_CONFIG[type];
    return {
      name: cfg.name,
      slug: cfg.slug,
      type,
      icon: cfg.icon,
      iconMissing: cfg.icon === null,
    };
  });

  await prisma.$transaction([
    prisma.orderProducts.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.siteSettings.deleteMany(),
  ]);

  await prisma.category.createMany({ data: categoriesData });

  const categories = await prisma.category.findMany();
  const categoryByType = new Map(categories.map((category) => [category.type, category.id]));

  await prisma.product.createMany({
    data: productsData.map((product) => ({
      sanityId: product.sanityId,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      image: product.image,
      menuType: product.menuType,
      displayOrder: product.displayOrder,
      featured: product.featured,
      isNew: product.isNew,
      isVeg: product.isVeg,
      size: product.size,
      categoryId: categoryByType.get(product.categoryType)!,
    })),
  });

  const settings = docs.find((doc) => doc._type === "siteSettings");
  if (settings) {
    await prisma.siteSettings.create({
      data: {
        title: (settings as Record<string, unknown>).title as string | undefined,
        subtitle: (settings as Record<string, unknown>).subtitle as string | undefined,
        statusText: (settings as Record<string, unknown>).statusText as string | undefined,
        address: (settings as Record<string, unknown>).address as string | undefined,
        phone: (settings as Record<string, unknown>).phone as string | undefined,
        instagramUrl: (settings as Record<string, unknown>).instagramUrl as string | undefined,
        facebookUrl: (settings as Record<string, unknown>).facebookUrl as string | undefined,
        uberEatsUrl: (settings as Record<string, unknown>).uberEatsUrl as string | undefined,
        wazeUrl: (settings as Record<string, unknown>).wazeUrl as string | undefined,
        whatsappNumber: (settings as Record<string, unknown>).whatsappNumber as string | undefined,
      },
    });
  }

  const missingIcons = categoriesData.filter((category) => category.iconMissing);

  console.log(`Seed Sanity completado: ${categoriesData.length} categorias, ${productsData.length} productos.`);

  if (missingImages.length) {
    console.log("Productos con imagen faltante (usando placeholder):");
    missingImages.forEach((item) => console.log(`- ${item}`));
  }

  if (missingIcons.length) {
    console.log("Categorias con icono faltante:");
    missingIcons.forEach((category) =>
      console.log(`- ${category.name} (slug: ${category.slug}, type: ${category.type})`)
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
