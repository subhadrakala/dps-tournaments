import Tournament from "../models/tournaments.model.js";

export const createTournament = async (name, status) => {
    try {
        const tournament = await Tournament.create({
            name,
            status
        });
        return tournament;
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
}

export const getAllTournaments = async () => {
    try {
        const tournaments = await Tournament.findAll();
        return tournaments;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
    }
}

export const updateTournament = async (id, status) => {
    try {
        const tournament = await Tournament.update({
            status
        }, {
            where: {
                id
            }
        });
        return tournament;
    } catch (error) {
        console.error('Error updating tournament status:', error);
        throw error;
    }
}

export const getTournamentById = async (id) => {
    try {
        const tournament = await Tournament.findOne({
            where: {
                id
            }
        });

        return tournament;
    } catch (error) {
        console.error('Error fetching tournament by id:', error);
        throw error;
    }
}