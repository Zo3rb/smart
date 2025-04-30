const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Import all documentation files to ensure they're included
require("./routes/healthCheck.routes");
require("./components/response.component");

// Setup swagger middleware
const setupSwagger = (app) => {
  // Serve swagger docs
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Smart ERP API Documentation",
    })
  );

  // Serve swagger spec as JSON
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

module.exports = setupSwagger;
