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

export const getAllTournamentsSchema = {
    response: z.array(tournamentResponseSchema)
};

export const createTournamentSchema = {
    body: z.object({
        name: z.string().min(1, "Tournament name is required"),
        status: z.enum(["planning", "started", "finished"], {
            invalid_type_error: "Invalid status",
        }),
    }),
    response: tournamentResponseSchema
};

export const updateTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    body: z.object({
        status: z.enum(["planning", "started", "finished"], {
            invalid_type_error: "Invalid status",
        }),
    }),
    response: tournamentResponseSchema
};

export const deleteTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    response: tournamentResponseSchema
};

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

export const addPlayerToTournamentSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    body: z.object({
        playerId: z.coerce.number().int().positive("A valid Player id is required"),
    }),
    response: tournamentPlayerResponseSchema
};

export const getTournamentPlayersSchema = {
    params: z.object({
        id: z.coerce.number().int().positive("A valid Tournament id is required"),
    }),
    response: z.array(tournamentPlayerResponseSchema)
};