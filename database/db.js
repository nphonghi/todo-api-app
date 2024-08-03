import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize';
import { print, OutputType } from '../helpers/print.js';

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_ROOT_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

async function connect() {
    try {
        let connectDB = await sequelize.authenticate();
        print('Connection database successfully!', OutputType.SUCCESS);
        return connectDB;
    } catch (error) {
        print(`Cannot connect database: ${error.message}`, OutputType.ERROR)
    }
}

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        print('Database synchronized successfully!', OutputType.SUCCESS);
    } catch (error) {
        print(`Error synchronizing database: ${error.message}`, OutputType.ERROR);
    }
}

export {
    sequelize,
    connect,
    syncDatabase
};
