import express from "express";
import { createPlayer, getAllPlayers, getPlayerById, deletePlayer } from "../controllers/player.js";
import { validateRequest } from "../middleware/validation.js";
import { createPlayerSchema, deletePlayerSchema, getPlayerByIdSchema, getAllPlayersSchema } from "../validations/playerValidations.js";

const router = express.Router();

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     description: Creates a new player with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name: 
 *                 type: string
 *                 description: Name of the player
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Player ID
 *                 name: 
 *                   type: string
 *                   description: Name of the player
 *       400:
 *         description: Invalid request
 *   get:   
 *     summary: Get all players
 *     description: Retrieves all players.
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
 *                   id: 
 *                   type: integer
 *                   description: Player ID
 *                 name: 
 *                   type: string
 *                   description: Name of the player
 *       404:
 *         description: Players not found
 */
router.route('/players')
    .post(
        validateRequest(createPlayerSchema),
        async (req, res, next) => {
            try {
                const result = await createPlayer(req, res, next);
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        }
    )
    .get(
        validateRequest(getAllPlayersSchema),
        async (req, res, next) => {
            try {
                const result = await getAllPlayers(req, res, next);
                if (!result) return res.status(404).json({ message: "Not players found" });
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        }
    );

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     description: Retrieves a player by their unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Player found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Player ID
 *                 name: 
 *                   type: string
 *                   description: Name of the player
 *       404:
 *         description: Player not found
 *   delete:
 *     summary: Delete a player by ID
 *     description: Deletes a player by their unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   description: Player ID
 *                 name: 
 *                   type: string
 *                   description: Name of the player
 *       404:
 *         description: Player not found
 */ 
router.route('/players/:id')
    .get(
        validateRequest(getPlayerByIdSchema),
        async (req, res, next) => {
            try {
                const result = await getPlayerById(req, res, next);
                if (!result) return res.status(404).json({ message: "Not found" });
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        }
    )
    .delete(
        validateRequest(deletePlayerSchema),
        async (req, res, next) => {
            try {
                const result = await deletePlayer(req, res, next);
                if (!result) return res.status(404).json({ message: "Not found" });
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        }
    );

export default router;