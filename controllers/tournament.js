import * as tournamentService from "../source/tournament.js";
import * as playerService from "../source/player.js";
import { MAX_PLAYERS_PER_TOURNAMENT } from "../common/constants.js";

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

export const addPlayerToTournament = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const playerId = req.body.playerId;

        const tournament = await tournamentService.getTournamentById(tournamentId);
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });

        const player = await playerService.getPlayerById(playerId);
        if (!player) return res.status(404).json({ message: "Player not found" });

        const currentTournamentPlayers = await tournamentService.getPlayersCountForTournament(tournamentId);

        if (currentTournamentPlayers >= MAX_PLAYERS_PER_TOURNAMENT) {
            return res.status(400).json({ message: "Tournament is full" });
        }

        const checkPlayerAlreadyAdded = await tournamentService.getPlayerForTournament(tournamentId, playerId);
        if (checkPlayerAlreadyAdded) {
            return res.status(400).json({ message: "Player already added to tournament" });
        }

        const tournamentPlayers = await tournamentService.addPlayerToTournament(tournamentId, playerId);
        return tournamentPlayers;
    } catch (error) {
        console.error('Error adding player to tournament:', error);
        throw error;
    }
}

export const getAllPlayersForTournament = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;

        const tournament = await tournamentService.getTournamentById(tournamentId);
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });

        const tournamentPlayers = await tournamentService.getAllPlayersForTournament(tournamentId);
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament players:', error);
        throw error;
    }
}

export const getTournamentInfo = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const tournamentDetails = await tournamentService.getTournamentById(tournamentId);
        if (!tournamentDetails) return res.status(404).json({ message: "Tournament not found" });

        const tournamentInfo = await tournamentService.getTournamentInfo(tournamentId);

        const tournamentInfoWithDetails = {
            tournamentName: tournamentDetails.name,
            tournamentStatus: tournamentDetails.status,
        };
        let players = [];

        for (const player of tournamentInfo) {
            let playerName = await playerService.getPlayerById(player.playerId);

            let playerinfo = {
                playerId: player.playerId,
                playerName: playerName.dataValues.name,
                score: player.totalScore,
                totalWins: player.totalWins,
                totalLosses: player.totalLosses,
                totalDraws: player.totalDraws,
            }
       
            players.push(playerinfo);
        }

        tournamentInfoWithDetails.players = players;
        return tournamentInfoWithDetails;
    } catch (error) {
        console.error('Error fetching tournament info:', error);
        throw error;
    }
}