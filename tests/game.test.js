import { jest } from '@jest/globals';
import request from 'supertest';
import app, { start } from '../server.js';
import sequelize from '../common/database.js';

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    jest.spyOn(console, 'error').mockImplementation(() => {});
    sequelize.options.storage = ':memory:';
    await start();
});

afterAll(async () => {
    console.error.mockRestore();
    await sequelize.drop();
    await sequelize.close();
});

describe('Game API', () => {
    it('should create a new game', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'started'
        });
        const player1 = await request(app).post('/players').send({
            name: 'Player 1'
        });
        const player2 = await request(app).post('/players').send({
            name: 'Player 2'
        });

        const player1DataInTournament = await request(app)
            .post(`/tournaments/${tournament.body.id}/players`)
            .send({
                playerId: player1.body.id,
            });

        const player2DataInTournament = await request(app)
            .post(`/tournaments/${tournament.body.id}/players`)
            .send({
                playerId: player2.body.id,
            });

        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: player1.body.id,
            player2Id: player2.body.id,
            player1Score: 2,
            player2Score: 0
        });
    
        expect(game.statusCode).toBe(201);
        expect(game.body).toHaveProperty('tournamentId', tournament.body.id);
        expect(game.body).toHaveProperty('player1Id', player1.body.id);
        expect(game.body).toHaveProperty('player2Id', player2.body.id);
    });

    it('should fail to create a new game with invalid tournament id', async () => {
        const game = await request(app).post('/games').send({
            tournamentId: 1000,
            player1Id: 1,
            player2Id: 2,
            player1Score: 2,
            player2Score: 0
        });
        expect(game.statusCode).toBe(404);
        expect(game.body).toHaveProperty('message', 'Tournament not found');
    });

    it('should fail to create a new game with invalid player1 id', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
       
        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: 1000,
            player2Id: 2,
            player1Score: 2,
            player2Score: 0
        });

        expect(game.statusCode).toBe(404);
        expect(game.body).toHaveProperty('message', 'Player1 not found');
    });

    it('should fail to create a new game with invalid player2 id', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
        const player = await request(app).post('/players').send({
            name: 'Player 2'
        });


        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: player.body.id,
            player2Id: 1000,
            player1Score: 2,
            player2Score: 0
        });
        expect(game.statusCode).toBe(404);
        expect(game.body).toHaveProperty('message', 'Player2 not found');
    });

    it('should fail to create a new game with same player1 and player2 id', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: 1,
            player2Id: 1,
            player1Score: 2,
            player2Score: 0
        });
        expect(game.statusCode).toBe(400);
        expect(game.body).toHaveProperty('error', 'Player 1 id and Player 2 id cannot be the same');
    });

    it('should fail to create a new game with invalid tournament status', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: 1,
            player2Id: 2,
            player1Score: 2,
            player2Score: 0
        });
        expect(game.statusCode).toBe(400);
        expect(game.body).toHaveProperty('message', 'Tournament must be in progress (started) to create a game');
    });

    it('should fail to create a new game if player2 is not added to tournament', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'started'
        });
        const player1 = await request(app).post('/players').send({
            name: 'Player 1'
        });

        const player2 = await request(app).post('/players').send({
            name: 'Player 2'
        });

        const player1DataInTournament = await request(app)
            .post(`/tournaments/${tournament.body.id}/players`)
            .send({
                playerId: player1.body.id,
            });

        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: player1.body.id,
            player2Id: player2.body.id,
            player1Score: 2,
            player2Score: 0
        });
        expect(game.statusCode).toBe(400);
        expect(game.body).toHaveProperty('message', 'Player2 not added to tournament');
    });

    it('should fail to create a new game if player1 is not added to tournament', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'started'
        });

          const player1 = await request(app).post('/players').send({
            name: 'Player 1'
        });

        const player2 = await request(app).post('/players').send({
            name: 'Player 2'
        });

        const player2DataInTournament = await request(app)
            .post(`/tournaments/${tournament.body.id}/players`)
            .send({
                playerId: player2.body.id,
            });

        const game = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: player1.body.id,
            player2Id: player2.body.id,
            player1Score: 2,
            player2Score: 0
        });
        expect(game.statusCode).toBe(400);
        expect(game.body).toHaveProperty('message', 'Player1 not added to tournament');
    });

    it('should fail to create a new game if player1 and player2 has already played against each other in this tournament', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'started'
        });

        const player1 = await request(app).post('/players').send({
            name: 'Player 1'
        });

        const player2 = await request(app).post('/players').send({
            name: 'Player 2'
        });

        const player1DataInTournament = await request(app)
            .post(`/tournaments/${tournament.body.id}/players`)
            .send({
                playerId: player1.body.id,
            });

        const player2DataInTournament = await request(app)
            .post(`/tournaments/${tournament.body.id}/players`)
            .send({
                playerId: player2.body.id,
            });

        const game1 = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: player1.body.id,
            player2Id: player2.body.id,
            player1Score: 2,
            player2Score: 0
        });

        const game2 = await request(app).post('/games').send({
            tournamentId: tournament.body.id,
            player1Id: player1.body.id,
            player2Id: player2.body.id,
            player1Score: 2,
            player2Score: 0
        });

        expect(game2.statusCode).toBe(400);
        expect(game2.body).toHaveProperty('message', 'Player1 and player2 has already played against each other in this tournament');
    });
});