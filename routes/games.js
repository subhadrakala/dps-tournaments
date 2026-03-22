import express from 'express';
import * as gameController from '../controllers/games.js';
import { validateRequest } from '../middleware/validation.js';
import * as gameValidations from '../validations/gameValidations.js';

const router = express.Router();

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Creates a new game with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tournamentId
 *               - player1Id
 *               - player2Id
 *               - player1Score
 *               - player2Score
 *             properties:
 *               tournamentId: 
 *                 type: integer
 *                 description: Tournament ID
 *                 example: 1
 *               player1Id: 
 *                 type: integer
 *                 description: Player 1 ID
 *                 example: 1
 *               player2Id: 
 *                 type: integer
 *                 description: Player 2 ID
 *                 example: 2
 *               player1Score: 
 *                 type: integer
 *                 description: Player 1 Score
 *                 example: 1
 *               player2Score: 
 *                 type: integer
 *                 description: Player 2 Score
 *                 example: 1
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Game ID
 *                   example: 1
 *                 tournamentId: 
 *                   type: integer
 *                   description: Tournament ID
 *                   example: 1
 *                 player1Id: 
 *                   type: integer
 *                   description: Player 1 ID
 *                   example: 1
 *                 player2Id: 
 *                   type: integer
 *                   description: Player 2 ID
 *                   example: 2
 *                 score1: 
 *                   type: integer
 *                   description: Player 1 Score
 *                   example: 0
 *                 score2: 
 *                   type: integer
 *                   description: Player 2 Score
 *                   example: 2
 *       400:
 *         description: Invalid request
 */
router.route('/games')
    .post(
        validateRequest(gameValidations.createGameSchema),
        async (req, res, next) => {
            try {
                const result = await gameController.createGame(req, res, next);
                if (!res.headersSent) {
                    res.status(201).json(result);
                }
            } catch (error) {
                next(error);
            }
        }
    )

export default router;
