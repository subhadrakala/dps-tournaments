import * as playerService from "../source/player.js";
import * as gameService from "../source/game.js";
import * as tournamentService from "../source/tournament.js";

/*
* createPlayer
* 
* Creates a player entry in the table.
* 
* @param {string} name - The name of the player
* @returns {object} - The created player
*/
export const createPlayer = async (req, res, next) => {
    try {
        const { name } = req.body;
        const player = await playerService.createPlayer(name);
        return player;
    } catch (error) {
        next(error);
    }
}

/*
* getAllPlayers
* 
* Gets all players from the table.
* 
* @returns {object} - The list of players
*/
export const getAllPlayers = async (req, res, next) => {
    try {
        const players = await playerService.getAllPlayers();
        return players;
    } catch (error) {
        next(error);
    }
}

/*
* getPlayerById
* 
* Gets a player by ID from the table.
* 
* @param {string} id - The ID of the player
* @returns {object} - The player
*/
export const getPlayerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await playerService.getPlayerById(id);
        return player;
    } catch (error) {
        next(error);
    }
}

/*
* deletePlayer
* 
* Deletes a player from the table. Also deletes all games
* and tournaments associated with the player.
* 
* @param {string} id - The ID of the player
* @returns {object} - The deleted player
*/
export const deletePlayer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await playerService.deletePlayer(id);
        const games = await gameService.deleteGamesByPlayerId(id);
        const tournaments = await tournamentService.deletePlayerFromTournament(id);    
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
}