const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tienda API",
      version: "1.0.0",
      description: "API REST para la tienda de ropa",
    },
    servers: [
      {
        url: "/api",
      },
    ],
  },
  apis: ["./routes/apiProductRoutes.js"],
};

module.exports = swaggerJsdoc(options);
