import express from "express";
import sequelize from "./common/database.js";
import tournamentRouter from "./routes/tournament.js";
import playerRouter from "./routes/player.js";
import gameRouter from "./routes/games.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(tournamentRouter)
app.use(playerRouter);
app.use(gameRouter);

const isTest = process.env.NODE_ENV === 'test';

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