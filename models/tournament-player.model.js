import { DataTypes } from "sequelize";
import sequelize from "../common/database.js";

const TournamentPlayer = sequelize.define('TournamentPlayer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tournaments',
            key: 'id',
        }
    },
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Players',
            key: 'id',
        }
    },
    totalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    totalWins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    totalLosses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    totalDraws: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

export default TournamentPlayer;