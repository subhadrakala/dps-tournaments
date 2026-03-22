import z from "zod";

const playerResponseSchema = z.object({
    id: z.number().int().positive(),
    name: z.string()
});

export const createPlayerSchema = {
    body: z.object({
        name: z.preprocess(
            (val) => val ?? "",
            z.string().min(1, "Player name is required")
        ),
    }),
    response: playerResponseSchema
};

export const getAllPlayersSchema = {
    response: z.array(playerResponseSchema)
};

export const getPlayerByIdSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("Player id must be a positive integer"),
    }),
    response: playerResponseSchema
};

export const deletePlayerSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("Player id must be a positive integer"),
    }),
    response: playerResponseSchema
};
