import { DataTypes } from "sequelize";
import sequelize from "../common/database.js";

/*
* Player model
* 
* Represents a player in the tournament.
*  Contains columns id, name
*/
const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Player;