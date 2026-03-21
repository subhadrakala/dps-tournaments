import z from "zod";

export const createTournamentSchema = {
    body: z.object({
        name: z.string().min(1, "Tournament name is required"),
        status: z.enum(["planning", "started", "finished"], {
            invalid_type_error: "Invalid status",
        }),
    })
};

export const updateTournamentSchema = {
    params: z.object({
        id: z.string().min(1, "Tournament id is required"),
    }),
    body: z.object({
        status: z.enum(["planning", "started", "finished"], {
            invalid_type_error: "Invalid status",
        }),
    })
};

export const deleteTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().min(1, "A valid Tournament id is required"),
    })
};

export const getTournamentByIdSchema = {
    params: z.object({
        id: z.coerce.number().int().min(1, "A valid Tournament id is required"),
    })
};