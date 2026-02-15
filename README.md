# Mutz Pizzeria - Quiosco Next

Aplicacion interna de quiosco y panel admin para Mutz Pizzeria.

## Stack

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zustand
- React Toastify

## Branding

- UI oscura con acentos Mutz.
- Tipografias `Outfit` y `Playfair Display`.
- Moneda en CRC (`es-CR`).

## Requisitos

- Node.js `>=20.9.0`
- Base de datos PostgreSQL accesible desde `DATABASE_URL`

## Variables de entorno

Archivo `.env`:

```env
DATABASE_URL="postgresql://..."
```

## Instalacion

```bash
npm install
```

## Base de datos y datos iniciales

El seed actual importa datos desde export de Sanity.

Debes tener esta carpeta en el root del proyecto (o en `public/`):

`production-export-2026-02-15t00-38-27-315z`

Contenido esperado:

- `data.ndjson`
- `assets.json`
- `images/`

Comandos:

```bash
npx prisma migrate deploy
npx prisma db seed
```

El seed:

- Crea categorias por tipo (`pizza`, `bread`, `dessert`, `drink`, `wine`)
- Crea productos con estructura nueva (flags y orden)
- Copia imagenes a `public/products`
- Crea `siteSettings`
- Regla especial: `Tiramisu` se asigna a `Postres`

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Estructura Prisma actual

Modelos principales:

- `Category` (incluye `type`, `icon`, `iconMissing`)
- `Product` (incluye `sanityId`, `menuType`, `displayOrder`, `featured`, `isNew`, `isVeg`, `size`)
- `Order`
- `OrderProducts`
- `SiteSettings`

## Rutas principales

- Quiosco: `/order/[category]`
- Ordenes listas: `/orders`
- Admin ordenes: `/admin/orders`
- Admin productos: `/admin/products`

## Assets

- Logo UI: `public/mutz-logo.svg`
- Fondo: `public/pizza-bg.jpeg`
- Imagenes de productos generadas por seed: `public/products/*`

