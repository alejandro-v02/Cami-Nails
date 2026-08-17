# Rosa Dorada Nails — Landing Page

Landing page del salón de uñas **Rosa Dorada (Pitalito, Huila)**, construida con
React 19 + TypeScript + Vite. Belleza y nail art, con paleta crema/oro/rosa.

## Estructura

- `src/page/RosaDoradaNails.tsx` — toda la landing en un único componente:
  nav fijo, hero animado, sobre, servicios, galería en carrusel, testimonios
  rotativos, contacto (WhatsApp/Instagram) y footer. El CSS está embebido en un
  `<style>` dentro del componente.
- `src/main.tsx` — punto de entrada; renderiza `RosaDoradaNails`.
- `index.html` — entrada del bundle; contiene `lang="es"`, `<title>`, meta
  description/theme-color y las Google Fonts (Playfair Display + Jost) con
  `preconnect` + `display=swap`.
- `public/favicon.svg` — favicon de la marca (rosa abstracta en oro/rosa).

## Scripts

- `npm run dev` — servidor de desarrollo con HMR
- `npm run build` — `tsc -b && vite build` (genera `dist/`)
- `npm run lint` — `eslint .`
- `npm run preview` — sirve el build de producción

## Cambios de contenido pendientes (datos del negocio)

Estos valores son placeholders y deberían reemplazarse en
`src/page/RosaDoradaNails.tsx` con los datos reales del negocio:

- `WHATSAPP_NUMBER` (línea ~7) — es `573001234567`; poner el número real con
  formato internacional (código país + número, sin `+`).
- `INSTAGRAM_HANDLE` (línea ~8) — verificar que sea `@rosadorada.nails`.

Además, la galería (`GALERIA`) usa swatches ilustrativos en CSS; reemplazarlos
por `<img>` con fotos reales cuando estén disponibles.
