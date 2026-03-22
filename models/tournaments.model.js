import { DataTypes } from "sequelize";
import sequelize from "../common/database.js";

/*
* Tournament model
* 
* Represents a tournament.
*  Contains columns id, name, status
*/
const Tournament = sequelize.define('Tournament', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('planning', 'started', 'finished'),
        allowNull: false,
    },
});

export default Tournament;