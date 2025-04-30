/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API health check endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health status
 *     description: Returns the current status of the API and system information
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: API is running
 *                 system:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: object
 *                       properties:
 *                         days:
 *                           type: integer
 *                           example: 0
 *                         hours:
 *                           type: integer
 *                           example: 1
 *                         minutes:
 *                           type: integer
 *                           example: 30
 *                         seconds:
 *                           type: integer
 *                           example: 45
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-30T12:34:56.789Z
 *                     memory:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: string
 *                           example: 16.00 GB
 *                         free:
 *                           type: string
 *                           example: 8.50 GB
 *                         usage:
 *                           type: string
 *                           example: 46.88%
 *                     cpu:
 *                       type: object
 *                       properties:
 *                         cores:
 *                           type: integer
 *                           example: 8
 *                         model:
 *                           type: string
 *                           example: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz
 *                     node:
 *                       type: string
 *                       example: v22.13.1
 *                     platform:
 *                       type: string
 *                       example: linux
 *                     env:
 *                       type: string
 *                       example: development
 */
