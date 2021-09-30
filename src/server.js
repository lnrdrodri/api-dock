require("dotenv").config({path: "./.env"});

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const api_port = process.env.API_PORT;

app.listen(api_port, function(){
  console.log(`🚀 SERVER IS RUNNING ON PORT ${api_port}`);
});