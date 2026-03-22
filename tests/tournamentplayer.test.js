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

describe('Tournament Player', () => {
    test('should add player to tournament', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
        const player = await request(app).post('/players').send({
            name: 'Player 1'
        });
        const response = await request(app)
            .post('/tournaments/1/players')
            .send({
                playerId: player.body.id,
            });
        expect(response.statusCode).toBe(201);
    });

    test('should fail to add player to tournament with invalid tournament id', async () => {
        const response = await request(app)
            .post('/tournaments/1000/players')
            .send({
                playerId: 1,
            });
        expect(response.statusCode).toBe(404);
    });

    test('should fail to add player to tournament with invalid player id', async () => {
        const response = await request(app)
            .post('/tournaments/1/players')
            .send({
                playerId: 1000,
            });
        expect(response.statusCode).toBe(404);
    });

    test('should fail to add player to tournament with duplicate player id', async () => {
        const players = await request(app).get('/tournaments/1/players');
        const response = await request(app)
            .post('/tournaments/1/players')
            .send({
                playerId: players.body[0].id,
            });
        expect(response.statusCode).toBe(400);      
    });

});