# Tienda Creativa

Tienda de ropa y accesorios construida con React, Vite y React Router. El catálogo
actual utiliza productos de demostración definidos en `src/data/MockProductos.jsx`.

## Desarrollo

- `npm run dev`: inicia el servidor local.
- `npm run lint`: ejecuta ESLint.
- `npm run build`: genera la compilación de producción.

## Flujo de compra de demostración

Los productos se pueden agregar desde el catálogo o su detalle; el carrito combina
las unidades del mismo producto y conserva las cantidades en `localStorage`. Al
finalizar la compra se solicita iniciar sesión o crear una cuenta y después se
muestra el resumen de compra.

Credenciales ficticias para iniciar sesión:

- Correo: `demo@tiendacreativa.test`
- Contraseña: `Demo1234!`

La autenticación es solo en memoria: ni las cuentas creadas ni la sesión persisten
al recargar y no se guardan contraseñas en el navegador. Las credenciales de
demostración están centralizadas en `src/services/demoAuth.js` y son visibles en
el código cliente. No son un mecanismo de seguridad. El resumen no procesa pagos
ni registra pedidos reales.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
