import Game from "../models/games.models.js";

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

export const getGameByPlayerIdTournamentId = async (tournamentId, player1Id, player2Id) => {
    try {
        const game = await Game.findOne({
            where: {
                tournamentId,
                player1Id,
                player2Id
            }
        });
        return game;
    } catch (error) {
        console.error('Error fetching game by player id and tournament id:', error);
        throw error;
    }
}
                    