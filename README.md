# 🚀 Proyecto Qr-Koala

Este es el frontend del proyecto **Qr-koala** desarrollado con **Next.js 15**, **TypeScript**, **shadcn**, **tailwind**, **react-icons**, **react-color-ful**,. Este frontend se comunica con la parte backend de **qr-koala**, realizada con **firebase**, manejando la autenticación y estructurado para ser escalable y fácil de mantener.

## 📌  Tecnologías utilizadas

- **Next.js 15**: Framework React para aplicaciones web optimizadas.
- **TypeScript**: Superset de JavaScript que agrega tipado estático.
- **shadcn**: Libreria auxiliar de diseño para favilitar la creacion de componentes.
- **tailwind**: Libreria principal para manejar los estilos.
- **react-icons**: Libreria para la importacion de iconos.
- **react-color-ful**: Herramienta para agregar input de color.

## 🗂️ Estructura de Carpetas

El proyecto está organizado de la siguiente manera:

- **/app**: Contiene las rutas de la aplicación, reemplazando la carpeta `pages` de Next.js.
- **/components**:Manejo de funciones y herramientas dinamicas para facilitar el mantenimiento del proyecto
- **/context**: Manejo del estado global y contexto de la aplicación.
- **/libs**: Funciones utilitarias como la manipulación de auth, conexion a la db, manejo de tipados y control de funciones que realizar operaciones al back

## 🔒 Autenticación

La autenticación se realiza mediante **local storage** con **firebase** mediante link magico

- Al iniciar sesión, el backend genera un link magico que sera enviado al email del usuario.
- EL link magico facilita el registro de usuario y mejora el proceso de seguridad al validad el usuario al mismo tiempo que ingresa al aplicativo

## ⚙️ Instalación y configuración
- Instala dependencias
- Ejecuta en desarrollo con __npm run dev__
- Revisar puertos de ejecucion para no tener problemas

