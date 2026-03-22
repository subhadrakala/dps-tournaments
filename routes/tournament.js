import express from "express";
import * as tournamentController from "../controllers/tournament.js";
import { validateRequest } from "../middleware/validation.js";
import * as tournamentValidations from "../validations/tournamentValidations.js";

const router = express.Router();

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Create a new tournament
 *     description: Creates a new tournament with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tournament
 *                 example: Test Tournament
 *               status:
 *                 type: string
 *                 enum: ["planning", "started", "finished"]
 *                 description: Status of the tournament
 *                 example: planning
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Tournament ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the tournament
 *                   example: Test Tournament
 *                 status:
 *                   type: string
 *                   enum: ["planning", "started", "finished"]
 *                   description: Status of the tournament
 *                   example: planning
 *       400:
 *         description: Invalid request
 *
 *   get:
 *     summary: Get all tournaments
 *     description: Retrieves all tournaments.
 *     responses:
 *       200:
 *         description: Tournaments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Tournament ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of the tournament
 *                     example: Test Tournament
 *                   status:
 *                     type: string
 *                     enum: ["planning", "started", "finished"]
 *                     description: Status of the tournament
 *                     example: planning
 */
router.route('/tournaments')
    .post(
        validateRequest(tournamentValidations.createTournamentSchema), async (req, res, next) => {
            try {
                const result = await tournamentController.createTournament(req, res, next);
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        })
    .get(
        validateRequest(tournamentValidations.getAllTournamentsSchema), 
        async (req, res, next) => {
        try {
            const result = await tournamentController.getAllTournaments(req, res, next);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });

/**
 * @swagger
 * /tournaments/{id}:
 *   put:
 *     summary: Update a tournament
 *     description: Updates a tournament with the given details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status: 
 *                 type: string
 *                 enum: ["planning", "started", "finished"]
 *                 description: Status of the tournament
 *                 example: started
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Tournament ID
 *                   example: 1
 *                 name: 
 *                   type: string
 *                   description: Name of the tournament
 *                 status: 
 *                   type: string
 *                   enum: ["planning", "started", "finished"]
 *                   description: Status of the tournament
 *                   example: started
 *       404:
 *         description: Tournament not found
 * 
 *   get:
 *     summary: Get a tournament by ID
 *     description: Retrieves a tournament by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Tournament found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tournamentName: 
 *                   type: string
 *                   description: Name of the tournament
 *                 tournamentStatus: 
 *                   type: string
 *                   enum: ["planning", "started", "finished"]
 *                   description: Status of the tournament
 *                 players: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       playerId: 
 *                         type: integer
 *                         description: Player ID
 *                       playerName: 
 *                         type: string
 *                         description: Name of the player
 *                       score: 
 *                         type: integer
 *                         description: Score of the player
 *                       totalWins: 
 *                         type: integer
 *                         description: Total wins of the player
 *                       totalLosses: 
 *                         type: integer
 *                         description: Total losses of the player
 *                       totalDraws: 
 *                         type: integer
 *                         description: Total draws of the player
 *       404:
 *         description: Tournament not found
 * 
 *   delete:
 *     summary: Delete a tournament
 *     description: Deletes a tournament by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Tournament ID
 *                   example: 1
 *                 name: 
 *                   type: string
 *                   description: Name of the tournament
 *                   example: Test Tournament
 *                 status: 
 *                   type: string
 *                   enum: ["planning", "started", "finished"]
 *                   description: Status of the tournament
 *                   example: planning
 *       404:
 *         description: Tournament not found
 */
router.route('/tournaments/:id')
    .put(
        validateRequest(tournamentValidations.updateTournamentSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.updateTournament(req, res, next);
                if (!result) return res.status(404).json({ message: "Tournament not found" });
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        })
    .get(
        validateRequest(tournamentValidations.getTournamentByIdSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.getTournamentInfo(req, res, next);
                if (!result) return res.status(404).json({ message: "Tournament not found" });
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        })
    .delete(
        validateRequest(tournamentValidations.deleteTournamentSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.deleteTournament(req, res, next);
                if (!result) return res.status(404).json({ message: "Tournament not found" });
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        });

/**
 * @swagger
 * /tournaments/{id}/players:
 *   post:
 *     summary: Add a player to a tournament
 *     description: Adds a player to a tournament.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playerId
 *             properties:
 *               playerId: 
 *                 type: integer
 *                 description: Player ID
 *                 example: 1
 *     responses:
 *       201:
 *         description: Player added to tournament successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Tournament ID
 *                   example: 1
 *                 name: 
 *                   type: string
 *                   description: Name of the tournament
 *                   example: Test Tournament
 *                 totalScores: 
 *                   type: integer
 *                   description: Total scores of the tournament
 *                   example: 6
 *                 totalWins: 
 *                   type: integer
 *                   description: Total wins of the tournament
 *                   example: 2
 *                 totalLosses: 
 *                   type: integer
 *                   description: Total losses of the tournament
 *                   example: 0
 *                 totalDraws: 
 *                   type: integer
 *                   description: Total draws of the tournament
 *                   example: 2
 *       404:
 *         description: Tournament not found
 * 
 *   get:
 *     summary: Get all players in a tournament
 *     description: Retrieves all players in a tournament.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     responses:
 *       200:
 *         description: Players found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   playerId: 
 *                     type: integer
 *                     description: Player ID
 *                     example: 1
 *                   tournamentId: 
 *                     type: integer
 *                     description: Tournament ID
 *                     example: 1
 *                   totalScore: 
 *                     type: integer
 *                     description: Score of the player
 *                     example: 6
 *                   totalWins: 
 *                     type: integer
 *                     description: Total wins of the player
 *                     example: 3
 *                   totalLosses: 
 *                     type: integer
 *                     description: Total losses of the player
 *                     example: 0
 *                   totalDraws: 
 *                     type: integer
 *                     description: Total draws of the player
 *                     example: 0
 * 
 *       404:
 *         description: Tournament not found
 */
router.route('/tournaments/:id/players')
    .post(
        validateRequest(tournamentValidations.addPlayerToTournamentSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.addPlayerToTournament(req, res, next);
                if (!result) return res.status(404).json({ message: "Not found" });
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        })
    .get(
        validateRequest(tournamentValidations.getTournamentPlayersSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.getAllPlayersForTournament(req, res, next);
                if (!result) return res.status(404).json({ message: "Not found" });
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        }
    )

/**
 * @swagger
 * /tournaments/{id}/leaderboard:
 *   get:
 *     summary: Get the leaderboard of a tournament
 *     description: Retrieves the leaderboard of a tournament.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *           example: 1
 *     responses:
 *       200:
 *         description: Leaderboard found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   playerId: 
 *                     type: integer
 *                     description: Player ID
 *                     example: 1
 *                   playerName: 
 *                     type: string
 *                     description: Name of the player
 *                     example: Test Player
 *                   tournamentId: 
 *                     type: integer
 *                     description: Tournament ID
 *                     example: 1
 *                   totalScore: 
 *                     type: integer
 *                     description: Score of the player
 *                     example: 6
 *                   totalWins: 
 *                     type: integer
 *                     description: Total wins of the player
 *                     example: 3
 *                   totalLosses: 
 *                     type: integer
 *                     description: Total losses of the player
 *                     example: 0
 *                   totalDraws: 
 *                     type: integer
 *                     description: Total draws of the player
 *                     example: 0
 *       404:
 *         description: Tournament not found
 */
router.route('/tournaments/:id/leaderboard')
    .get(
        validateRequest(tournamentValidations.getTournamentByIdSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.getTournamentInfo(req, res, next);
                if (!result) return res.status(404).json({ message: "Tournament not found" });
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        }
    )

export default router;