import z from "zod";

const tournamentResponseSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    status: z.enum(["planning", "started", "finished"])
});

const tournamentPlayerResponseSchema = z.object({
    tournamentId: z.number().int().positive(),
    playerId: z.number().int().positive(),
    totalScore: z.number().int().nonnegative(),
    totalWins: z.number().int().nonnegative(),
    totalLosses: z.number().int().nonnegative(),
    totalDraws: z.number().int().nonnegative()
});

/*
* getAllTournamentsSchema
* 
* Validates the retrieval of all tournaments.
* 
* @param {object} response - The response
* @returns {object} - The validated response
*/
export const getAllTournamentsSchema = {
    response: z.array(tournamentResponseSchema)
};

/*
* createTournamentSchema
* 
* Validates the creation of a tournament.
* 
* Conditions:
* 1. Name must be a non-empty string
* 2. Status must be one of planning, started, or finished
* 
* @param {object} body - The body of the request
* @returns {object} - The validated body
*/
export const createTournamentSchema = {
    body: z.object({
        name: z.preprocess(
            (val) => val ?? "",
            z.string().min(1, "Tournament name is required")
        ),
        status: z.preprocess(
            (val) => val ?? "",
            z.enum(["planning", "started", "finished"], "Status is required with values planning, started, or finished")
        ),
    }),
    response: tournamentResponseSchema
};

/*
* updateTournamentSchema
* 
* Validates the update of a tournament.
* 
* Conditions:
* 1. ID must be a positive integer
* 2. Status must be one of planning, started, or finished
* 
* @param {object} params - The parameters
* @param {object} body - The body of the request
* @returns {object} - The validated parameters and body
*/
export const updateTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    body: z.object({
        status: z.preprocess(
            (val) => val ?? "",
            z.enum(["planning", "started", "finished"], "Status is required with values planning, started, or finished")
        ),
    }),
    response: tournamentResponseSchema
};

/*
* deleteTournamentSchema
* 
* Validates the deletion of a tournament by its ID.
* 
* Conditions:
* 1. ID must be a positive integer
* 
* @param {object} params - The parameters
* @returns {object} - The validated parameters
*/
export const deleteTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    response: tournamentResponseSchema
};

/*
* getTournamentByIdSchema
* 
* Validates the retrieval of a tournament by its ID.
* 
* Conditions:
* 1. ID must be a positive integer
* 
* @param {object} params - The parameters
* @returns {object} - The validated parameters
*/
export const getTournamentByIdSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    response: z.object({
        tournamentName: z.string(),
        tournamentStatus: z.enum(["planning", "started", "finished"]),
        players: z.array(z.object({
            playerId: z.number().int().positive(),
            playerName: z.string(),
            score: z.number().int().nonnegative(),
            totalWins: z.number().int().nonnegative(),
            totalLosses: z.number().int().nonnegative(),
            totalDraws: z.number().int().nonnegative()
        }))
    })
};

/*
* addPlayerToTournamentSchema
* 
* Validates the addition of a player to a tournament.
* 
* Conditions:
* 1. ID must be a positive integer
* 2. Player id must be a positive integer
* 
* @param {object} params - The parameters
* @param {object} body - The body of the request
* @returns {object} - The validated parameters and body
*/
export const addPlayerToTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    body: z.object({
        playerId: z.preprocess(
            (val) => val ?? "",
            z.coerce.number().int().positive("A valid Player id is required")
        ),
    }),
    response: tournamentPlayerResponseSchema
};

/*
* getTournamentPlayersSchema
* 
* Validates the retrieval of all players for a tournament.
* 
* Conditions:
* 1. ID must be a positive integer
* 
* @param {object} params - The parameters
* @returns {object} - The validated parameters
*/
export const getTournamentPlayersSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    response: z.array(tournamentPlayerResponseSchema)
};