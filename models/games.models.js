import { DataTypes } from "sequelize";
import sequelize from "../common/database.js";

const Games = sequelize.define('Games', {
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
    player1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Players',
            key: 'id',
        }
    },
    player2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Players',
            key: 'id',
        }
    },
    score1: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default Games;