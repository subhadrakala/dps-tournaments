import express from "express";
import { createPlayer, getAllPlayers, getPlayerById, deletePlayer } from "../controllers/player.js";
import { validateRequest } from "../middleware/validation.js";
import { createPlayerSchema, deletePlayerSchema, getPlayerByIdSchema } from "../validations/playerValidations.js";

const router = express.Router();

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