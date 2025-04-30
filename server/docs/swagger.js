const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart ERP API",
      version: "1.0.0",
      description: "API documentation for the Smart ERP system",
      contact: {
        name: "Ali Abu-elfottoh",
        url: "https://github.com/Zo3rb/smart",
      },
      license: {
        name: "Open Source",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:5000/api",
        description: "Development server",
      },
      {
        url: "https://erp-api.example.com/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // Path to the API docs
  apis: [
    path.join(__dirname, "./routes/*.js"), // Route documentation files
    path.join(__dirname, "./components/*.js"), // Reusable components
    path.join(__dirname, "./schemas/*.js"), // Schema definitions
  ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
