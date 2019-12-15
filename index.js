require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

let jsonParser = bodyParser.json();

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(jsonParser);
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", function() {
  console.log("connected to db...");
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

app.use(express.static(__dirname + "/views"));

app.post("/shorten", routes.createEntry);

app.get("*", routes.redirect);
