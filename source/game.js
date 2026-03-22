import Game from "../models/games.models.js";

/*
* createGame
* 
* Creates a new game.
* 
* @param {string} player1Id - The ID of the first player
* @param {string} player2Id - The ID of the second player
* @param {string} tournamentId - The ID of the tournament
* @param {string} player1Score - The score of the first player
* @param {string} player2Score - The score of the second player
* @returns {object} - The created game
*/
export const createGame = async (player1Id, player2Id, tournamentId, player1Score, player2Score) => {
    try {

        const game = await Game.create({
            player1Id,
            player2Id,
            tournamentId,
            player1Score,
            player2Score
        });
        return game;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
}

/*
* getGameByPlayerIdTournamentId
* 
* Gets a game by player ID and tournament ID.
* 
* @param {string} tournamentId - The ID of the tournament
* @param {string} player1Id - The ID of the first player
* @param {string} player2Id - The ID of the second player
* @returns {object} - The game
*/
export const getGameByPlayerIdTournamentId = async (tournamentId, player1Id, player2Id) => {
    try {
        const game = await Game.findOne({
            where: {
                [Op.or]: [
                    { player1Id: player1Id, player2Id: player2Id },
                    { player1Id: player2Id, player2Id: player1Id }
                ],
                tournamentId
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return game;
    } catch (error) {
        console.error('Error fetching game by player id and tournament id:', error);
        throw error;
    }
}

/*
* deleteGamesByPlayerId
* 
* Deletes all games for a player.
* 
* @param {string} playerId - The ID of the player
* @returns {object} - The number of games deleted
*/
export const deleteGamesByPlayerId = async (playerId) => {
    try {
        const games = await Game.destroy({
            where: {
                [Op.or]: [
                    { player1Id: playerId },
                    { player2Id: playerId }
                ]
            }
        });
        return games;
    } catch (error) {
        console.error('Error deleting games by player id:', error);
        throw error;
    }
}

/*
* countGamesByTournamentId
* 
* Counts the number of games in a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @returns {object} - The number of games
*/
export const countGamesByTournamentId = async (tournamentId) => {
    try {
        const gamesCount = await Game.count({
            where: {
                tournamentId
            }
        });
        return gamesCount;
    } catch (error) {
        console.error('Error counting games by tournament id:', error);
        throw error;
    }
}