/**
 * @swagger
 * components:
 *   responses:
 *     NotFound:
 *       description: The specified resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: fail
 *               message:
 *                 type: string
 *                 example: Resource not found
 *
 *     Unauthorized:
 *       description: Unauthorized access
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: fail
 *               message:
 *                 type: string
 *                 example: Authentication required
 *
 *     BadRequest:
 *       description: Bad request - validation error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: fail
 *               message:
 *                 type: string
 *                 example: Invalid input data
 *
 *     ServerError:
 *       description: Server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: error
 *               message:
 *                 type: string
 *                 example: Something went wrong
 */
