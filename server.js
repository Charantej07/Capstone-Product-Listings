let express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const Router = require("./Routers/routes");
const url = require("./url");

let app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/", Router);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to datbase");
  })
  .catch((err) => {
    console.log("Unable to connect to database: ", err);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servers is running in port: ", PORT);
});
