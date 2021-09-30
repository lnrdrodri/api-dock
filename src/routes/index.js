const express = require("express");
const accountsRouter = require("./accounts.routes");

const router = express.Router();

router.use("/accounts", accountsRouter);

module.exports = router;