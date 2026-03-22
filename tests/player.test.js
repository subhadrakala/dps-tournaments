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

describe('Player API', () => {
    it('should create a new player', async () => {
        const response = await request(app)
            .post('/players')
            .send({ name: 'Test Player' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Player');
    });

    it('should fail to create a new player with no name', async () => {
        const response = await request(app)
            .post('/players')
            .send({ name: '' });
        expect(response.statusCode).toBe(400);
    }); 

    it('should get all players', async () => {
        const response = await request(app).get('/players');
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
    });

    it('should get a player by id', async () => {
        const response = await request(app).get('/players/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');;
    });

    it('should fail to get a player by invalid id', async () => {
        const response = await request(app).get('/players/abcd');
        expect(response.statusCode).toBe(400);
    });

    it('should fail to get a player by non-existent id', async () => {
        const response = await request(app).get('/players/100');
        expect(response.statusCode).toBe(404);
    });
    
    it('should delete a player', async () => {
        const player = await request(app).post('/players').send({
            name: 'Test Player'
        });
        const response = await request(app).delete(`/players/${player.body.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
    });
});