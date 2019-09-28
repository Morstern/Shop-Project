const Sequelize = require("sequelize");

module.exports = new Sequelize("shop", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
