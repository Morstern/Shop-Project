const Sequelize = require("sequelize");

module.exports = new Sequelize("shop", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
