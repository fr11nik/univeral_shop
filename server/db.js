const { Sequelize } = require("sequelize");
const fs = require("fs");
module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    //config to connect to the db
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: (sql) => {
      fs.appendFileSync("query.log", `${sql}\n`);
    },
  }
);
