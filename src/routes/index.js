const express = require("express")
const accountsRouter = require("./accounts.routes")
const transactionsRouter = require("./transactions.routes")

const router = express.Router()

router.use("/accounts", accountsRouter)
router.use("/transactions", transactionsRouter)

module.exports = router