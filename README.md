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

- `WHATSAPP_NUMBER` (al inicio del archivo) — es `573001234567`; poner el
  número real con formato internacional (código país + número, sin `+`).
- `INSTAGRAM_HANDLE` (al inicio del archivo) — verificar que sea `@rosadorada.nails`.

## Galería

Las fotos están en `src/assets/` y se listan en `GALERIA`. Para añadir una,
impórtala arriba del archivo y agrégala al arreglo.

- Carrusel automático con efecto coverflow; la velocidad se cambia con
  `AUTOPLAY_MS` (en milisegundos).
- Se pausa con el ratón encima, al tocarlo en el teléfono (6 s), con una foto
  ampliada o cuando no está en pantalla, y no avanza solo si el dispositivo
  tiene activado "reducir movimiento".
- Al tocar una foto se abre ampliada: se cierra con ×, Esc o tocando fuera, y
  se cambia de foto con ‹ ›, las flechas del teclado o deslizando el dedo.

## Probar en el teléfono

```bash
npm run dev -- --host
```

Abre en el teléfono la dirección `Network` que muestra la terminal (el
teléfono debe estar en la misma wifi que el computador).
