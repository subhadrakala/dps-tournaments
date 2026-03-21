import { DataTypes } from "sequelize";
import sequelize from "../common/database.js";

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