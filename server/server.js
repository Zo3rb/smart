// Load environment variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const app = require("./app");

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.log("Server startup failed");
    process.exit(1);
  }
};

startServer();
