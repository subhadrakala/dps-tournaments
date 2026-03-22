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

describe('Testing Tournament APIs', () => {
    test('should create a new tournament', async () => {
        const response = await request(app)
            .post('/tournaments')
            .send({
                name: 'Tournament 1',
                status: 'planning'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Tournament 1');
        expect(response.body).toHaveProperty('status', 'planning');
    });

    test('should fail to create a new tournament with invalid status', async () => {
        const response = await request(app)
            .post('/tournaments')
            .send({
                name: 'Tournament 1',
                status: 'abcd'
            });
        expect(response.statusCode).toBe(400);
    });

    test('should fail to create a new tournament with no name', async () => {
        const response = await request(app)
            .post('/tournaments')
            .send({
                status: 'planning'
            });
        expect(response.statusCode).toBe(400);
    });

    test('should get all tournaments', async () => {
        const response = await request(app).get('/tournaments');
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name', 'Tournament 1');
        expect(response.body[0]).toHaveProperty('status', 'planning');
    });

    test('should get a tournament by id', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'started'
        });
        const response = await request(app).get(`/tournaments/${tournament.body.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('tournamentName', 'Tournament 1');
        expect(response.body).toHaveProperty('tournamentStatus', 'started');
    });

    test('should fail to get a tournament by invalid id', async () => {
        const response = await request(app).get('/tournaments/abcd');
        expect(response.statusCode).toBe(400);
    });

    test('should fail to get a tournament by non-existent id', async () => {
        const response = await request(app).get('/tournaments/100');
        expect(response.statusCode).toBe(404);
    });

    test('should update a tournament', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
        const response = await request(app)
            .put(`/tournaments/${tournament.body.id}`)
            .send({
                status: 'started'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Tournament 1');
        expect(response.body).toHaveProperty('status', 'started');
    });

    test('should fail to update a tournament with invalid status', async () => {
        const response = await request(app)
            .put('/tournaments/1')
            .send({
                status: 'abcd'
            });
        expect(response.statusCode).toBe(400);
    });

    test('should fail to update a tournament with invalid id', async () => {
        const response = await request(app)
            .put('/tournaments/abcd')
            .send({
                status: 'started'
            });
        expect(response.statusCode).toBe(400);
    });

    test('should fail to update a tournament with non-existent id', async () => {
        const response = await request(app)
            .put('/tournaments/100')
            .send({
                status: 'started'
            });
        expect(response.statusCode).toBe(404);
    });

    test('should delete a tournament', async () => {
        const tournament = await request(app).post('/tournaments').send({
            name: 'Tournament 1',
            status: 'planning'
        });
        const response = await request(app).delete(`/tournaments/${tournament.body.id}`);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Tournament 1');
        expect(response.body).toHaveProperty('status', 'planning');
    });

    test('should fail to delete a tournament with invalid id', async () => {
        const response = await request(app).delete('/tournaments/abcd');
        expect(response.statusCode).toBe(400);
    });

    test('should fail to delete a tournament with non-existent id', async () => {
        const response = await request(app).delete('/tournaments/100');
        expect(response.statusCode).toBe(404);
    }); 
});