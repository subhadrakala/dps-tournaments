import express from "express";
import * as tournamentController from "../controllers/tournament.js";

const router = express.Router();

router.route('/tournaments')
    .post(async (req, res, next) => {
        try {
            const result = await tournamentController.createTournament(req, res, next);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    })
    .get(async (req, res, next) => {
        try {
            const result = await tournamentController.getAllTournaments(req, res, next);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

export default router;