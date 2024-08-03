import { DataTypes } from 'sequelize';
import { sequelize }from '../database/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email is incorrect format'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5],
                msg: 'Password must be at least 5 characters'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2],
                msg: 'Username must be at least 2 characters'
            }
        }
    },
    createdTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'user',
    timestamps: false,
});

export default User;