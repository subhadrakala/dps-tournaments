import * as tournamentService from "../source/tournament.js";
import * as playerService from "../source/player.js";
import { MAX_PLAYERS_PER_TOURNAMENT } from "../common/constants.js";

/*
* createTournament
* 
* Creates a tournament entry in the table.
* 
* @param {string} name - The name of the tournament
* @param {string} status - The status of the tournament
* @returns {object} - The created tournament
*/
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

/*
* getAllTournaments
* 
* Gets all tournaments from the table.
* 
* @returns {object} - The list of tournaments
*/
export const getAllTournaments = async (req, res, next) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        return tournaments;

    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
    }
}

/*
* updateTournament
* 
* Updates a tournament entry in the table.
* 
* @param {string} id - The ID of the tournament
* @param {string} status - The status of the tournament
* @returns {object} - The updated tournament
*/
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

/*
* getTournamentById
* 
* Gets a tournament by ID from the table.
* 
* @param {string} id - The ID of the tournament
* @returns {object} - The tournament
*/
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

/*
* deleteTournament
* 
* Deletes a tournament from the table.
* 
* @param {string} id - The ID of the tournament
* @returns {object} - The deleted tournament
*/
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

/*
* addPlayerToTournament
* 
* Adds a player to a tournament. It also checks necessary
* conditions before adding the player to a tournament
* 
* Conditions:
* 1. Tournament must exist
* 2. Player must exist
* 3. Tournament must not be full
* 4. Player must not be already added to tournament
* 
* @param {string} tournamentId - The ID of the tournament
* @param {string} playerId - The ID of the player
* @returns {object} - The added player
*/
export const addPlayerToTournament = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const playerId = req.body.playerId;

        // Check if tournament exists
        const tournament = await tournamentService.getTournamentById(tournamentId);
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });

        // Check if player exists
        const player = await playerService.getPlayerById(playerId);
        if (!player) return res.status(404).json({ message: "Player not found" });

        const currentTournamentPlayers = await tournamentService.getPlayersCountForTournament(tournamentId);

        // Check if tournament is full
        if (currentTournamentPlayers >= MAX_PLAYERS_PER_TOURNAMENT) {
            return res.status(400).json({ message: "Tournament is full" });
        }

        // Check if player is already added to tournament
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

/*
* getAllPlayersForTournament
* 
* Gets all players for a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @returns {object} - The list of players
*/
export const getAllPlayersForTournament = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;

        // Check if tournament exists
        const tournament = await tournamentService.getTournamentById(tournamentId);
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });

        const tournamentPlayers = await tournamentService.getAllPlayersForTournament(tournamentId);
        return tournamentPlayers;
    } catch (error) {
        console.error('Error fetching tournament players:', error);
        throw error;
    }
}

/*
* getTournamentInfo
* 
* Gets all players for a tournament.
* 
* @param {string} tournamentId - The ID of the tournament
* @returns {object} - The list of players
*/
export const getTournamentInfo = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const tournamentDetails = await tournamentService.getTournamentById(tournamentId);
        if (!tournamentDetails) return res.status(404).json({ message: "Tournament not found" });

        // Fetch name and status from tournament table
        const tournamentInfo = await tournamentService.getTournamentInfo(tournamentId);

        const tournamentInfoWithDetails = {
            tournamentName: tournamentDetails.name,
            tournamentStatus: tournamentDetails.status,
        };
        let players = [];

        for (const player of tournamentInfo) {
            // Fetch name from player table
            let playerName = await playerService.getPlayerById(player.playerId);
            // Create player info object for leaderboard
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