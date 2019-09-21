const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const clients = require("./routes/clients");
const orders = require("./routes/orders");

// usun
const cors = require("cors");

const app = express();

//usun
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/client", clients);
app.use("/api/order", orders);

app.use(express.static("../frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
