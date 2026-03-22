import express from "express";
import sequelize from "./common/database.js";
import tournamentRouter from "./routes/tournament.js";
import playerRouter from "./routes/player.js";
import gameRouter from "./routes/games.js";
import { PORT, TEST } from "./common/constants.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(tournamentRouter)
app.use(playerRouter);
app.use(gameRouter);

const isTest = process.env.NODE_ENV === TEST;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tournament APIs',
      version: '1.0.0',
      description: 'Interactive API documentation for the Tournament, player and games APIs.'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ],
    tags: [
      { name: 'Tournaments', description: 'Tournament management' },
      { name: 'Players', description: 'Player management' },
      { name: 'Tournament Players', description: 'Managing players within tournaments' },
      { name: 'Games', description: 'Game management' }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export const start = async () => {
    try {
        await sequelize.sync();
        console.log('Successfully synced db');
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        });
    }
    catch (error) {
        console.error('Error syncing database or starting the server', error);
        if (!isTest) {
            process.exit(1);
        }
    }
}

if (!isTest) {
    start();
}   

export default app;