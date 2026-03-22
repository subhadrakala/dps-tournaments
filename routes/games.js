import express from 'express';
import * as gameController from '../controllers/games.js';
import { validateRequest } from '../middleware/validation.js';
import * as gameValidations from '../validations/gameValidations.js';

const router = express.Router();

router.route('/games')
    .post(
        validateRequest(gameValidations.createGameSchema),
        async (req, res, next) => {
            try {
                const result = await gameController.createGame(req, res, next);
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        }
    )

export default router;
