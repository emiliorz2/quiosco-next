# Mutz Pizzeria - Quiosco Next

Aplicacion de quiosco para pedidos y panel admin de Mutz Pizzeria.

## Stack

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zustand
- React Toastify

## Branding aplicado

- Paleta oscura con acentos rojos Mutz.
- Tipografias `Outfit` (UI) y `Playfair Display` (titulos).
- Fondo con overlay y cards elevadas.
- Formato de precios en colones costarricenses (`es-CR`, `CRC`).
- Sidebar, cards, tablas y formularios con estilo unificado.

## Requisitos

- Node.js `>=20.9.0`
- Base de datos PostgreSQL accesible desde `DATABASE_URL`

## Configuracion

1. Instala dependencias:

```bash
npm install
```

2. Configura variables en `.env`:

```env
DATABASE_URL="postgresql://..."
```

3. Aplica esquema y seed:

```bash
npx prisma migrate deploy
npx prisma db seed
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Rutas principales

- Quiosco: `/order/[category]`
- Ordenes listas: `/orders`
- Admin ordenes: `/admin/orders`
- Admin productos: `/admin/products`

## Assets usados

- Logo: `public/logomutz.jpeg`
- Fondo: `public/pizza-bg.jpeg`
