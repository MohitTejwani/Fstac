import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10),
      min: parseInt(process.env.DB_POOL_MIN, 10),
      idle: parseInt(process.env.DB_POOL_IDLE, 10),
      acquire: 60000,
    },
    dialectOptions: {
      // For bulk operations
      rejectUnauthorized: false,
    },
  }
);

export default sequelize;
