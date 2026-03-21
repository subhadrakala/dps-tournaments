import z from "zod";

export const createPlayerSchema = {
    body: z.object({
        name: z.string().min(1, "Player name is required"),
    })
};

export const getPlayerByIdSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("Player id must be a positive integer"),
    })
};

export const deletePlayerSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("Player id must be a positive integer"),
    })
};
