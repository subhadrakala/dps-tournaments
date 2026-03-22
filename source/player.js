import Player from "../models/players.model.js";

/*
* createPlayer
* 
* Creates a new player.
* 
* @param {string} name - The name of the player
* @returns {object} - The created player
*/
export const createPlayer = async (name) => {
    try {
        const player = await Player.create({
            name,
        });
        return player;
    } catch (error) {
        console.error('Error creating player:', error);
        throw error;
    }
}

/*
* getAllPlayers
* 
* Gets all players.
* 
* @returns {object} - All players
*/
export const getAllPlayers = async () => {
    try {
        const players = await Player.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt']}
        });
        return players;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}

/*
* getPlayerById
* 
* Gets a player by its ID.
* 
* @param {string} id - The ID of the player
* @returns {object} - The player
*/
export const getPlayerById = async (id) => {
    try {
        const player = await Player.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        });
        return player;
    } catch (error) {
        console.error('Error fetching player by id:', error);
        throw error;
    }
}

/*
* deletePlayer
* 
* Deletes a player by its ID.
* 
* @param {string} id - The ID of the player
* @returns {object} - The deleted player
*/
export const deletePlayer = async (id) => {
    try {
        const player = await Player.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        });
        if (!player) return null;
        await Player.destroy({ where: { id } });
        return player;
    } catch (error) {
        console.error('Error deleting player:', error);
        throw error;
    }
}

