import z from "zod";

const playerResponseSchema = z.object({
    id: z.number().int().positive(),
    name: z.string()
});

/*
* createPlayerSchema
* 
* Validates the creation of a player.
* 
* Conditions:
* 1. Name must be a non-empty string
* 
* @param {object} body - The body of the request
* @returns {object} - The validated body
*/
export const createPlayerSchema = {
    body: z.object({
        name: z.preprocess(
            (val) => val ?? "",
            z.string().min(1, "Player name is required")
        ),
    }),
    response: playerResponseSchema
};

/*
* getAllPlayersSchema
* 
* Validates the retrieval of all players.
* 
* @param {object} response - The response
* @returns {object} - The validated response
*/
export const getAllPlayersSchema = {
    response: z.array(playerResponseSchema)
};

/*
* getPlayerByIdSchema
* 
* Validates the retrieval of a player by its ID.
* 
* Conditions:
* 1. Player id must be a positive integer
* 
* @param {object} params - The parameters
* @returns {object} - The validated parameters
*/
export const getPlayerByIdSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("Player id must be a positive integer"),
    }),
    response: playerResponseSchema
};

/*
* deletePlayerSchema
* 
* Validates the deletion of a player by its ID.
* 
* Conditions:
* 1. Player id must be a positive integer
* 
* @param {object} params - The parameters
* @returns {object} - The validated parameters
*/
export const deletePlayerSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("Player id must be a positive integer"),
    }),
    response: playerResponseSchema
};
