const express = require("express");
const router = express.Router();

const db = require("../config/database");
const Client = require("../models/Client");
const Order = require("../models/Order");

const ClientUtils = require("../utils/ClientUtils");

// @desc: get all clients
router.get("/", (req, res) =>
  Client.findAll()
    .then(clients => {
      if (clients) {
        res.status(200).send(clients);
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć klientów" });
      }
    })
    .catch(err => console.log(err))
);

router.get("/nicknames", (req, res) =>
  Client.findAll({ attributes: ["nickname"] })
    .then(clients => {
      if (clients) {
        res.status(200).send(clients);
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć klientów" });
      }
    })
    .catch(err => console.log(err))
);

// @desc: get client
router.get("/:nickname", (req, res) => {
  Client.findOne({ where: { nickname: req.params.nickname } })
    .then(client => {
      if (client) {
        res.status(200).send(client);
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć takiego klienta" });
      }
    })
    .catch(err => console.log(err));
});

// @desc: get all client's orders
router.get("/:nickname/orders", (req, res) => {
  Client.findOne({ where: { nickname: req.params.nickname } })
    .then(client => {
      if (client) {
        client.getOrders().then(orders => {
          res.status(200).send(orders);
        });
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć takiego klienta" });
      }
    })
    .catch(err => console.log(err));
});

// @desc: add new client
router.post("/", (req, res) => {
  Client.findOne({ where: { nickname: req.body.nickname } }).then(client => {
    if (client) {
      return res.status(400).json({ nickname: "Taka krótka nazwa istnieje" });
    } else {
      let newClient = ClientUtils.getClientData(req);

      Client.create(newClient)
        .then(client => res.send(client))
        .catch(err => console.log(err));
    }
  });
});

// @desc: delete client
router.delete("/:nickname", (req, res) => {
  Client.findOne({ where: { nickname: req.params.nickname } }).then(client => {
    if (client) {
      Order.findAll({ where: { clientNickname: req.params.nickname } }).then(
        orders => {
          if (orders) {
            orders.map(order => {
              order.destroy();
            });
          }

          setTimeout(() => {}, 50);

          client
            .destroy()
            .then(res.status(200).send("Pozytywnie usunięto klienta"));
        }
      );
    } else {
      res.status(404).send();
    }
  });
});

// @desc: change data for client
router.put("/:nickname", (req, res) => {
  let updateClient = ClientUtils.getClientData(req);

  if (req.params.nickname != req.body.nickname) {
    Client.findOne({ where: { nickname: req.body.nickname } }).then(client => {
      if (client) {
        res
          .status(404)
          .json({ nickname: "Ktoś już ma przydzieloną taką krótką nazwę" });
      } else {
        db.query(
          "UPDATE `shop`.`orders` SET `amount` = 5 WHERE `idorder` = 'DDDDD';"
        );

        setTimeout(() => {}, 150);

        Client.update(updateClient, {
          where: {
            nickname: req.params.nickname
          }
        }).then(res.status(200).send("Pozytywnie zmieniono dane"));
      }
    });
  } else {
    Client.update(updateClient, {
      where: {
        nickname: req.params.nickname
      }
    }).then(res.status(200).send("Pozytywnie zmieniono dane"));
  }
});

module.exports = router;
