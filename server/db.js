const { Sequelize } = require("sequelize");
const fs = require("fs");

module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    // Конфигурация для подключения к MySQL
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: (sql) => {
      fs.appendFileSync("query.log", `${sql}\n`);
    },
  }
);
