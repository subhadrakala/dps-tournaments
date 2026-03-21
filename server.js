import express from "express";
import sequelize from "./common/database.js";
import tournamentRouter from "./routes/tournament.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(tournamentRouter);

try {
    await sequelize.sync();
    console.log('Successfully synced db');
} catch (error) {
    console.error('Error syncing database:', error);

}
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
