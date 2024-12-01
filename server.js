const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerOptions");
const errorHandler = require("./middlewares/error");
// Body parser // FrontEnd dan serverga ma'lumotlarni olish uchun yordam beradigon Middlewarelar hisoblanadi
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Connecting to DB
connectDB();
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// "public/uploads" papkasini statik fayllar uchun ulash
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Swagger UI uchun endpointni yaratamiz
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/stars", require("./routes/star.route"));
app.use("/api/v1/planets", require("./routes/planet.route"));

// Error
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `"Server is running on port" -${process.env.NODE_ENV} - ${PORT}`.bgGreen
  );
});
