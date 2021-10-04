require("dotenv").config({path: "./.env"})

const app = require("./server")

const api_port = process.env.API_PORT;

app.listen(api_port, function(){
  console.log(`🚀 SERVER IS RUNNING ON PORT ${api_port}`);
});