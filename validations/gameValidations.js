import z from "zod";

export const createGameSchema = {
    body: z.object({
        player1Id: z.coerce.number().int().positive("A valid Player id is required"),
        player2Id: z.coerce.number().int().positive("A valid Player id is required"),
        tournamentId: z.coerce.number().int().positive("A valid Tournament id is required"),
        player1Score: z.coerce.number().int().nonnegative("A valid Game number is required"),
        player2Score: z.coerce.number().int().nonnegative("A valid Game number is required"),
    })
};
