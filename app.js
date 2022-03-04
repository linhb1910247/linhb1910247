const express = require("express");
const cors = require("cors");


const setupContactRouters = require("./app/routes/index");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


setupContactRouters(app);

module.exports = app;