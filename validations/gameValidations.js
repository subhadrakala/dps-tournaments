import z from "zod";

const gameResponseSchema = z.object({
    id: z.number().int().positive(),
    player1Id: z.number().int().positive(),
    player2Id: z.number().int().positive(),
    tournamentId: z.number().int().positive(),
    score1: z.number().int().nonnegative(),
    score2: z.number().int().nonnegative()
});

export const createGameSchema = {
    body: z.object({
        player1Id: z.coerce.number().int().positive("A valid Player id is required"),
        player2Id: z.coerce.number().int().positive("A valid Player id is required"),
        tournamentId: z.coerce.number().int().positive("A valid Tournament id is required"),
        player1Score: z.coerce.number().int().nonnegative("A valid score is required for player1"),
        player2Score: z.coerce.number().int().nonnegative("A valid score is required for player2"),
    }).refine((data) => data.player1Id !== data.player2Id, {
        message: "Player 1 id and Player 2 id cannot be the same",
    }),
    response: gameResponseSchema
};
