import Tournament from "../models/tournaments.model.js";
import TournamentPlayer from "../models/tournament-player.model.js";

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
        const [affectedRows] = await Tournament.update({
            status
        }, {
            where: {
                id
            }
        });
        if (affectedRows === 0) return null;
        return await Tournament.findOne({ where: { id } });
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

export const deleteTournament = async (id) => {
    try {
        const tournament = await Tournament.findOne({ where: { id } });
        if (!tournament) return null;
        
        await Tournament.destroy({
            where: {
                id
            }
        });
        return tournament;
    } catch (error) {
        console.error('Error deleting tournament:', error);
        throw error;
    }
}

export const addPlayerToTournament = async (tournamentId, playerId) => {
    try {
        const tournamentPlayer = await TournamentPlayer.create({
            tournamentId,
            playerId,
        });
        return tournamentPlayer;
    } catch (error) {
        console.error('Error adding player to tournament:', error);
        throw error;
    }
}

export const getPlayersCountForTournament = async (tournamentId) => {
    try {
        const playersCount = await TournamentPlayer.count({ where: { tournamentId } });
        return playersCount;
    } catch (error) {
        console.error('Error fetching players count:', error);
        throw error;
    }
}

export const getAllPlayersForTournament = async (tournamentId) => {
    try {
        const tournamentPlayers = await TournamentPlayer.findAll({ where: { tournamentId } });
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament players:', error);
        throw error;
    }
}

export const getPlayerForTournament = async (tournamentId, playerId) => {
    try {
        const tournamentPlayers = await TournamentPlayer.findOne({ where: { tournamentId, playerId } });
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament players:', error);
        throw error;
    }
}

export const updateGameDataInTournamentForPlayer = async (tournamentId, playerId, totalScore, totalWins, totalLosses, totalDraws) => {
    try {
        const tournamentPlayer = await TournamentPlayer.update({
            totalScore,
            totalWins,
            totalLosses,
            totalDraws
        }, {
            where: {
                tournamentId,
                playerId
            }
        });
        return tournamentPlayer;
    } catch (error) {
        console.error('Error updating game data in tournament:', error);
        throw error;
    }
}

export const getTournamentInfo = async (tournamentId) => {
    try {
        const tournamentPlayers = await TournamentPlayer.findAll({
            where: {
                tournamentId
            },
            order: [
                ['totalScore', 'DESC'],
                ['totalWins', 'DESC'],
                ['totalDraws', 'ASC'],
                ['totalLosses', 'ASC'],
            ]
        });
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament info:', error);
        throw error;
    }
}