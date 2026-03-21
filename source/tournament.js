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

