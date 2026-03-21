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
