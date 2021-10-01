const express = require("express")
const sql = require("../database/db")

const transactionsRouter = express.Router()

transactionsRouter.post("/", function(req, res) {
  try {
    const {idConta, valor, dataTransacao} = req.body

    const fields = [
      idConta,
      valor,
      dataTransacao
    ]

    const query = "INSERT INTO transacoes(idConta, valor, dataTransacao) VALUES (?, ?, ?)"

    sql.query(query, fields, function(err, results, fields) {
      if(err) throw new Error('erro')

      const id = results.affectedRows ? results.insertId : 0

      return res.status(201).json({success: true, id})
    })

  } catch (err) {
    return res.status(400).json({success: false, error: err.message})
  }
})

module.exports = transactionsRouter