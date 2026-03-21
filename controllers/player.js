import * as playerService from "../source/player.js";

export const createPlayer = async (req, res, next) => {
    try {
        const { name } = req.body;
        const player = await playerService.createPlayer(name);
        return player;
    } catch (error) {
        next(error);
    }
}

export const getAllPlayers = async (req, res, next) => {
    try {
        const players = await playerService.getAllPlayers();
        return players;
    } catch (error) {
        next(error);
    }
}

export const getPlayerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await playerService.getPlayerById(id);
        return player;
    } catch (error) {
        next(error);
    }
}

export const deletePlayer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await playerService.deletePlayer(id);
        return player;
    } catch (error) {
        next(error);
    }
}