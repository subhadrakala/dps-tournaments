import express from "express";
import * as tournamentController from "../controllers/tournament.js";

const router = express.Router();

router.route('/tournaments')
    .post(async (req, res, next) => {
        try {
            console.log(req.body);
            const result = await tournamentController.createTournament(req, res, next);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    })

export default router;