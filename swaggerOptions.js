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
        url: "https://planetarium-node-c4inqky3o-izzatbekmadaminov7141s-projects.vercel.app", // Loyihaning serveri URL manzili
      },
    ],
  },
  apis: ["./routes/*.js"], // API endpointlari joylashgan fayllarni belgilash
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
