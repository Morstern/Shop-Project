const Sequelize = require("sequelize");
const db = require("../config/database");

class Order extends Sequelize.Model {}
Order.init(
  {
    idorder: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    orderdate: {
      type: Sequelize.DATE
    },
    amount: {
      type: Sequelize.INTEGER
    },
    discount: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    clientNickname: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db,
    modelName: "order"
  }
);

module.exports = Order;
