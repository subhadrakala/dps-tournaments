import z from "zod";

const gameResponseSchema = z.object({
    id: z.number().int().positive(),
    player1Id: z.number().int().positive(),
    player2Id: z.number().int().positive(),
    tournamentId: z.number().int().positive(),
    score1: z.number().int().nonnegative(),
    score2: z.number().int().nonnegative()
});

/*
* createGameSchema
* 
* Validates the creation of a game.
* 
* Conditions:
* 1. Player 1 id and Player 2 id cannot be the same
* 2. Total score must be 2
* 3. Player 1 id and Player 2 id must be positive integers
* 4. Tournament id must be valid
* 5. Player 1 score and Player 2 score must be non-negative integers
* 
* @param {object} body - The body of the request
* @returns {object} - The validated body
*/
export const createGameSchema = {
    body: z.object({
        player1Id: z.preprocess(
            (val) => val ?? "",
            z.coerce.number().int().positive("A valid Player id is required")),
        player2Id: z.preprocess(
            (val) => val ?? "",
            z.coerce.number().int().positive("A valid Player id is required")),
        tournamentId: z.preprocess(
            (val) => val ?? "",
            z.coerce.number().int().positive("A valid Tournament id is required")),
        player1Score: z.coerce.number().int().nonnegative("A valid score is required for player1"),
        player2Score: z.coerce.number().int().nonnegative("A valid score is required for player2"),
    }).refine((data) => data.player1Id !== data.player2Id, {
        message: "Player 1 id and Player 2 id cannot be the same",
    }).refine((data) => data.player1Score + data.player2Score == 2, {
        message: "Total score must be 2",
    }),

    response: gameResponseSchema
};
