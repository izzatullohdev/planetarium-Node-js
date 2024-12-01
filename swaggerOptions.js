// swaggerOptions.js

const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Swagger versiyasi
    info: {
      title: "Planetarium API", // API nomi
      version: "1.0.0", // API versiyasi
      description: "Planetarium tizimining API hujjatlari", // API haqida tavsif
    },
    servers: [
      {
        url: "http://localhost:3000", // Loyihaning serveri URL manzili
      },
    ],
  },
  apis: ["./routes/*.js"], // API endpointlari joylashgan fayllarni belgilash
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
