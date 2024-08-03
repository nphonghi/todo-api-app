import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deadline: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed', 'Cancelled'),
        defaultValue: 'Not Started',
    },
    userID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'todo',
    timestamps: false,
});

export default Todo;