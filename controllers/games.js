import * as gameService from "../source/game.js";
import * as tournamentService from "../source/tournament.js";
import * as playerService from "../source/player.js";

export const createGame = async (req, res, next) => {
    try {
        const player1Id = req.body.player1Id;
        const player2Id = req.body.player2Id;
        const tournamentId = req.body.tournamentId;
        const player1Score = req.body.player1Score;
        const player2Score = req.body.player2Score; 

        const tournament = await tournamentService.getTournamentById(tournamentId);
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });

        const player1 = await playerService.getPlayerById(player1Id);
        if (!player1) return res.status(404).json({ message: "Player1 not found" });

        const player2 = await playerService.getPlayerById(player2Id);
        if (!player2) return res.status(404).json({ message: "Player2 not found" });

        if(tournament.status !== 'started') return res.status(400).json({ message: "Tournament must be in progress (started) to create a game" });

        const player1DataInTournament = await tournamentService.getPlayerForTournament(tournamentId, player1Id);
        if (player1DataInTournament == null) return res.status(400).json({ message: "Player1 not added to tournament" });

        const player2DataInTournament = await tournamentService.getPlayerForTournament(tournamentId, player2Id);
        if (player2DataInTournament == null) return res.status(400).json({ message: "Player2 not added to tournament" });

        const gamePlayed = await gameService.getGameByPlayerIdTournamentId(tournamentId, player1Id, player2Id);
        if (gamePlayed) return res.status(400).json({ message: "Player1 and player2 has already played against each other in this tournament" });
      
        const game = await gameService.createGame(player1Id, player2Id, tournamentId, player1Score, player2Score);

        if (player1Score > player2Score) {
            const newPlayer1Score = player1DataInTournament.totalScore + player1Score;
            const newPlayer1Wins = player1DataInTournament.totalWins + 1;
            const newPlayer1Losses = player1DataInTournament.totalLosses;
            const newPlayer1Draws = player1DataInTournament.totalDraws;

            await tournamentService.updateGameDataInTournamentForPlayer(tournamentId, player1Id, newPlayer1Score, newPlayer1Wins, newPlayer1Losses, newPlayer1Draws);
        } else if (player1Score < player2Score) {
            const newPlayer2Score = player2DataInTournament.totalScore + player2Score;
            const newPlayer2Wins = player2DataInTournament.totalWins + 1;
            const newPlayer2Losses = player2DataInTournament.totalLosses;
            const newPlayer2Draws = player2DataInTournament.totalDraws;

            await tournamentService.updateGameDataInTournamentForPlayer(tournamentId, player2Id, newPlayer2Score, newPlayer2Wins, newPlayer2Losses, newPlayer2Draws);
        } else {
            const newPlayer1Score = player1DataInTournament.totalScore + player1Score;
            const newPlayer1Wins = player1DataInTournament.totalWins;
            const newPlayer1Losses = player1DataInTournament.totalLosses;
            const newPlayer1Draws = player1DataInTournament.totalDraws + 1;

            const newPlayer2Score = player2DataInTournament.totalScore + player2Score;
            const newPlayer2Wins = player2DataInTournament.totalWins;
            const newPlayer2Losses = player2DataInTournament.totalLosses;
            const newPlayer2Draws = player2DataInTournament.totalDraws + 1;

            await tournamentService.updateGameDataInTournamentForPlayer(tournamentId, player1Id, newPlayer1Score, newPlayer1Wins, newPlayer1Losses, newPlayer1Draws);
            await tournamentService.updateGameDataInTournamentForPlayer(tournamentId, player2Id, newPlayer2Score, newPlayer2Wins, newPlayer2Losses, newPlayer2Draws);
        }

        return game;

    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
}