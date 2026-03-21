import express from "express";
import * as tournamentController from "../controllers/tournament.js";
import { validateRequest } from "../middleware/validation.js";
import { createTournamentSchema } from "../validations/tournamentValidations.js";

const router = express.Router();

router.route('/tournaments')
    .post(
        validateRequest(createTournamentSchema), async (req, res, next) => {
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

router.route('/tournaments/:id')
    .put(async (req, res, next) => {
        try {
            console.log(req.body);
            const result = await tournamentController.updateTournament(req, res, next);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    })
    .get(async (req, res, next) => {
        try {
            const result = await tournamentController.getTournamentById(req, res, next);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await tournamentController.deleteTournament(req, res, next);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

export default router;