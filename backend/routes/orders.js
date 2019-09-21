const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Client = require("../models/Client");

const OrderUtils = require("../utils/OrderUtils");

// @desc: get all orders
router.get("/", (req, res) =>
  Order.findAll()
    .then(orders => {
      if (orders) {
        res.status(200).send(orders);
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć zamówień" });
      }
    })
    .catch(err => console.log(err))
);

// @desc: get order
router.get("/:orderId", (req, res) =>
  Order.findOne({ where: { idorder: req.params.orderId } })
    .then(order => {
      if (order) {
        res.status(200).send(order);
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć takiego zamówienia" });
      }
    })
    .catch(err => console.log(err))
);

// @desc: create order
router.post("/", (req, res) => {
  Client.findOne({ where: { nickname: req.body.clientNickname } }).then(
    client => {
      if (client) {
        Order.findOne({ where: { idorder: req.body.idorder } }).then(order => {
          if (order) {
            return res.status(400).json({ orderId: "Taka ID paczki istnieje" });
          } else {
            let newOrder = OrderUtils.getOrderData(req);

            Order.create(newOrder)
              .then(order => res.send(order))
              .catch(err => console.log(err));
          }
        });
      } else {
        res.status(400).json({ clientNickname: "Taki klient nie istnieje" });
      }
    }
  );
});

// @desc: delete order
router.delete("/:orderId", (req, res) => {
  Order.findOne({ where: { idorder: req.params.orderId } }).then(order => {
    if (order) {
      order
        .destroy()
        .then(res.status(200).send("Pozytywnie usunięto zamówienie"));
    } else {
      res.status(404).send();
    }
  });
});

// @desc: update order
router.put("/:orderId", (req, res) => {
  let updateOrder = OrderUtils.getOrderData(req);

  Client.findOne({ where: { nickname: req.body.clientNickname } }).then(
    client => {
      if (client) {
        Order.update(updateOrder, {
          where: {
            idorder: req.params.orderId
          }
        })
          .then(res.status(200).send("Pozytywnie zmieniono dane"))
          .catch(err => console.log(err));
      } else {
        res.status(404).json({
          clientNicknameError: "Nie ma klienta o takiej krótkiej nazwie"
        });
      }
    }
  );
});

module.exports = router;
