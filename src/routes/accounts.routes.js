const express = require("express")
const repositoryAccount = require("../repositories/repository-accounts")

const accountsRouter = express.Router()

accountsRouter.post("/", async function(req, res){
  const dbResponse = await repositoryAccount.insertAccount(req.body)

  if (dbResponse.success) {
    return res.status(201).json(dbResponse)
  } else {
    return res.status(400).json(dbResponse)
  }
})

accountsRouter.post("/:id/deposity", async function(req, res){
  const dbResponse = await repositoryAccount.deposityInAccount(req.params.id, req.body)

  if (dbResponse.success) {
    return res.status(201).json(dbResponse)
  } else {
    return res.status(400).json(dbResponse)
  }
})

accountsRouter.get("/:id/balance", async function(req, res){
  const dbResponse = await repositoryAccount.balanceAccount(req.params.id)

  if (dbResponse.success) {
    return res.status(200).json(dbResponse)
  } else {
    return res.status(400).json(dbResponse)
  }
})

accountsRouter.post("/:id/withdraw", async function(req, res){
  const dbResponse = await repositoryAccount.withdrawInAccount(req.params.id, req.body)

  if (dbResponse.success) {
    return res.status(201).json(dbResponse)
  } else {
    return res.status(400).json(dbResponse)
  }
})

accountsRouter.patch("/:id/block", async function(req, res){
  const dbResponse = await repositoryAccount.blockAccount(req.params.id)

  if (dbResponse.success) {
    return res.status(201).json(dbResponse)
  } else {
    return res.status(400).json(dbResponse)
  }
})

accountsRouter.get("/:id/transactions", async function(req, res){
  const {dtInicial, dtFinal} = req.body
  const dbResponse = await repositoryAccount.allTransactions(req.params.id, dtInicial, dtFinal)

  if (dbResponse.success) {
    return res.status(201).json(dbResponse)
  } else {
    return res.status(400).json(dbResponse)
  }
})
module.exports = accountsRouter