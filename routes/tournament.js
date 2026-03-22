import express from "express";
import * as tournamentController from "../controllers/tournament.js";
import { validateRequest } from "../middleware/validation.js";
import * as tournamentValidations from "../validations/tournamentValidations.js";

const router = express.Router();

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
    .get(async (req, res, next) => {
        try {
            const result = await tournamentController.getAllTournaments(req, res, next);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });

router.route('/tournaments/:id')
    .put(
        validateRequest(tournamentValidations.updateTournamentSchema),
        async (req, res, next) => {
            try {
                const result = await tournamentController.updateTournament(req, res, next);
                if (!result) return res.status(404).json({ message: "Not found" });
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
                if (!result) return res.status(404).json({ message: "Not found" });
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
                if (!result) return res.status(404).json({ message: "Not found" });
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        });

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

export default router;