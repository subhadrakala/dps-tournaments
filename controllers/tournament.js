import * as tournamentService from "../source/tournament.js";

export const createTournament = async (req, res, next) => {
    try {
        const name = req.body.name;
        const status = req.body.status;

        const tournament = await tournamentService.createTournament(name, status);
        return tournament;

    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
}

export const getAllTournaments = async (req, res, next) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        return tournaments;

    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
    }
}

export const updateTournament = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Note: need to change to generic update later
        const status = req.body.status;


        const tournament = await tournamentService.updateTournament(id, status);
        return tournament;
    } catch (error) {
        console.error('Error updating tournament status:', error);
        throw error;
    }
}

export const getTournamentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tournament = await tournamentService.getTournamentById(id);
        return tournament;
    } catch (error) {
        console.error('Error fetching tournament by id:', error);
        throw error;
    }
}

export const deleteTournament = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tournament = await tournamentService.deleteTournament(id);
        return tournament;
    } catch (error) {
        console.error('Error deleting tournament:', error);
        throw error;
    }
}