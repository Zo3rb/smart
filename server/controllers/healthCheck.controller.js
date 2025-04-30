const os = require("os");

/**
 * Get detailed system information for health check
 * @returns {Object} System information including uptime, memory usage, CPU details, etc.
 */
const getSystemInfo = () => {
  const uptimeInSeconds = process.uptime();
  const uptimeFormatted = {
    days: Math.floor(uptimeInSeconds / 86400),
    hours: Math.floor((uptimeInSeconds % 86400) / 3600),
    minutes: Math.floor((uptimeInSeconds % 3600) / 60),
    seconds: Math.floor(uptimeInSeconds % 60),
  };

  return {
    uptime: uptimeFormatted,
    timestamp: new Date().toISOString(),
    memory: {
      total: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
      free: `${(os.freemem() / 1024 ** 3).toFixed(2)} GB`,
      usage: `${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`,
    },
    cpu: {
      cores: os.cpus().length,
      model: os.cpus()[0].model,
    },
    node: process.version,
    platform: process.platform,
    env: process.env.NODE_ENV,
  };
};

/**
 * Health check controller
 * Returns API status and system information
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
    system: getSystemInfo(),
  });
};
