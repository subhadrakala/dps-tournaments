import Player from "../models/players.model.js";

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

export const getAllPlayers = async () => {
    try {
        const players = await Player.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        return players;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}

export const getPlayerById = async (id) => {
    try {
        const player = await Player.findOne({
            where: { id },
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        return player;
    } catch (error) {
        console.error('Error fetching player by id:', error);
        throw error;
    }
}
export const deletePlayer = async (id) => {
    try {
        const player = await Player.findOne({
            where: { id },
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        if (!player) return null;
        await Player.destroy({ where: { id } });
        return player;
    } catch (error) {
        console.error('Error deleting player:', error);
        throw error;
    }
}

