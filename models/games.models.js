import { DataTypes } from "sequelize";
import sequelize from "../common/database.js";

/*
* Games model
* 
* Represents a game in the tournament.
*  Contains columns id, tournamentId, player1Id, player2Id,
*  score1, score2
*/
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
        defaultValue: 0,
    },
    score2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

export default Games;