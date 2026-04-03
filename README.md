# TIENDA DE ROPA

Aplicación web de una tienda de ropa construida con Express y MongoDB. Las vistas se generan con template literals en el servidor (SSR), sin frameworks de frontend.

## Qué hace

Permite visualizar un catálogo de productos (camisetas, pantalones, zapatos y accesorios) y gestionarlos desde un dashboard protegido con autenticación.

Los usuarios pueden navegar por los productos y filtrar por categoría. El administrador puede crear, editar y eliminar productos desde el dashboard. Las credenciales del admin se configuran en el archivo .env.

También expone una API REST que devuelve los datos en formato JSON, pensada para conectar un frontend en React o similar en el futuro.

## Tecnologías utilizadas

- Express (servidor web)
- Mongoose (ODM para MongoDB)
- express-session (gestión de sesiones para el login)
- Multer + Cloudinary (subida de imágenes en la nube)
- method-override (soporte para PUT y DELETE desde formularios HTML)
- swagger-ui-express + swagger-jsdoc (documentación de la API)
- Jest + Supertest (testing)

## Instalación

```
npm install
```

Crear un archivo .env en la raíz con las siguientes variables:

```
PORT=3000
MONGO_URI=tu_uri_de_mongo
SESSION_SECRET=una_cadena_secreta
ADMIN_EMAIL=admin@mail.com
ADMIN_PASSWORD=tu_password
CLOUDINARY_CLOUD_NAME=tu_cloud
CLOUDINARY_API_KEY=tu_key
CLOUDINARY_API_SECRET=tu_secret
```

Poblar la base de datos con productos de ejemplo:

```
npm run seed
```

Arrancar en desarrollo:

```
npm run dev
```

Arrancar en producción:

```
npm start
```

## Rutas

Públicas (sin autenticación):

- GET / --> redirige a /products
- GET /products --> todos los productos
- GET /products?category=Camisetas --> filtrado por categoría
- GET /products/:id --> detalle de un producto

Protegidas (requieren login, si no redirige a /login):

- GET /dashboard --> listado de productos con opciones de gestión
- GET /dashboard/new --> formulario para crear producto
- POST /dashboard --> crea el producto
- GET /dashboard/:id --> detalle con botones de editar y borrar
- GET /dashboard/:id/edit --> formulario de edición
- PUT /dashboard/:id --> actualiza el producto
- DELETE /dashboard/:id/delete --> elimina el producto

API REST (respuestas en JSON):

- GET /api/products --> todos los productos
- GET /api/products?category=Zapatos --> filtrado por categoría
- GET /api/products/:id --> un producto por id
- POST /api/products --> crea un producto (multipart/form-data)
- PUT /api/products/:id --> actualiza un producto
- DELETE /api/products/:id --> elimina un producto

La documentación interactiva de la API está disponible en /api-docs (Swagger).

## Tests

```
npm test
```

12 tests que cubren las rutas SSR y la API REST. Si fallan probablemente sea por la conexión a la base de datos o porque se ha roto algo.

## Deploy

Desplegado en Render. Cada push a main redespliega automáticamente. Hay que configurar las variables de entorno en el panel de Render o no va a funcionar nada.

## Estructura del proyecto

```
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   └── swagger.js
├── controllers/
│   ├── apiProductController.js
│   ├── authController.js
│   └── productController.js
├── helpers/
│   └── htmlHelpers.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── uploadCloudinaryMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── Product.js
│   └── User.js
├── public/
│   └── styles.css
├── routes/
│   ├── apiProductRoutes.js
│   ├── authRoutes.js
│   └── productRoutes.js
├── test/
│   └── productController.test.js
├── index.js
├── seed.js
└── package.json
```
