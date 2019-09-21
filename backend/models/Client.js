const Sequelize = require("sequelize");
const db = require("../config/database");
const Order = require("./Order");

class Client extends Sequelize.Model {}

Client.init(
  {
    nickname: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    adress: {
      type: Sequelize.STRING
    },
    postcode: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    facebookfan: {
      type: Sequelize.TINYINT
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize: db,
    modelName: "client"
  }
);

Client.hasMany(Order, { as: "orders" });

module.exports = Client;
