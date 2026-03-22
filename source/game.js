import Game from "../models/games.models.js";

export const createGame = async (player1Id, player2Id, tournamentId, player1Score, player2Score) => {
    try {
        console.log(player1Id, player2Id, tournamentId, player1Score, player2Score);
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