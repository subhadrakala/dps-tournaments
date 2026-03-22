import Tournament from "../models/tournaments.model.js";
import TournamentPlayer from "../models/tournament-player.model.js";

/*
* createTournament
* 
* Creates a new tournament.
* 
* @param {string} name - The name of the tournament
* @param {string} status - The status of the tournament
* @returns {object} - The created tournament
*/
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

/*
* getAllTournaments
* 
* Gets all tournaments.
* 
* @returns {object} - All tournaments
*/
export const getAllTournaments = async () => {
    try {
        const tournaments = await Tournament.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return tournaments;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
    }
}

/*
* updateTournament
* 
* Updates the status of a tournament.
* 
* @param {string} id - The ID of the tournament
* @param {string} status - The status of the tournament
* @returns {object} - The updated tournament
*/
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
        return await Tournament.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    } catch (error) {
        console.error('Error updating tournament status:', error);
        throw error;
    }
}

/*
* getTournamentById
* 
* Gets a tournament by its ID.
* 
* @param {string} id - The ID of the tournament
* @returns {object} - The tournament
*/
export const getTournamentById = async (id) => {
    try {
        const tournament = await Tournament.findOne({
            where: {
                id
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return tournament;
    } catch (error) {
        console.error('Error fetching tournament by id:', error);
        throw error;
    }
}

/*
* deleteTournament
* 
* Deletes a tournament by its ID.
* 
* @param {string} id - The ID of the tournament
* @returns {object} - The deleted tournament
*/
export const deleteTournament = async (id) => {
    try {
        const tournament = await Tournament.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
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

/*
* addPlayerToTournament
* 
* Adds a player to a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @param {string} playerId - The ID of the player
* @returns {object} - The added player
*/
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

/*
* getPlayersCountForTournament
* 
* Gets the number of players in a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @returns {object} - The number of players
*/
export const getPlayersCountForTournament = async (tournamentId) => {
    try {
        const playersCount = await TournamentPlayer.count({
            where: { tournamentId },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return playersCount;
    } catch (error) {
        console.error('Error fetching players count:', error);
        throw error;
    }
}

/*
* getAllPlayersForTournament
* 
* Gets all players for a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @returns {object} - All players for the tournament
*/
export const getAllPlayersForTournament = async (tournamentId) => {
    try {
        const tournamentPlayers = await TournamentPlayer.findAll({
            where: { tournamentId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [
                ['totalScore', 'DESC'],
                ['totalWins', 'DESC'],
                ['totalDraws', 'ASC'],
                ['totalLosses', 'ASC'],
            ]
        });
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament players:', error);
        throw error;
    }
}

/*
* getPlayerForTournament
* 
* Gets a player for a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @param {string} playerId - The ID of the player
* @returns {object} - The player
*/
export const getPlayerForTournament = async (tournamentId, playerId) => {
    try {
        const tournamentPlayers = await TournamentPlayer.findOne({
            where: { tournamentId, playerId },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament players:', error);
        throw error;
    }
}

/*
* updateGameDataInTournamentForPlayer
* 
* Updates the game data for a player in a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @param {string} playerId - The ID of the player
* @param {number} totalScore - The total score of the player
* @param {number} totalWins - The total wins of the player
* @param {number} totalLosses - The total losses of the player
* @param {number} totalDraws - The total draws of the player
* @returns {object} - The updated player
*/
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
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return tournamentPlayer;
    } catch (error) {
        console.error('Error updating game data in tournament:', error);
        throw error;
    }
}

/*
* getTournamentInfo
* 
* Gets the info of a tournament. It returns the list of players in the tournament
* sorted by total score, total wins, total draws and total losses.
* 
* @param {string} tournamentId - The ID of the tournament
* @returns {object} - The info of the tournament
*/
export const getTournamentInfo = async (tournamentId) => {
    try {
        const tournamentPlayers = await TournamentPlayer.findAll({
            where: {
                tournamentId
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

/*
* deletePlayerFromTournament
* 
* Deletes a player from a tournament.
* 
* @param {string} playerId - The ID of the player
* @returns {object} - The deleted player
*/
export const deletePlayerFromTournament = async (playerId) => {
    try {
        const tournamentPlayer = await TournamentPlayer.destroy({
            where: {
                playerId
            }
        });
        return tournamentPlayer;
    } catch (error) {
        console.error('Error deleting player from tournament:', error);
        throw error;
    }
}