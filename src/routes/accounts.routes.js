const express = require("express")
const sql = require("../database/db");

const accountsRouter = express.Router()

accountsRouter.post("/", function(req, res){
  try{
    const { idPessoa, saldo, limiteSaqueDiario, tipoConta} = req.body

    const fields = [
      idPessoa,
      saldo,
      limiteSaqueDiario,
      tipoConta
    ]
    
    const query = "INSERT INTO contas(idPessoa, saldo, limiteSaqueDiario, tipoConta, dataCriacao) VALUES (?, ?, ?, ?, NOW())"
    sql.query(query, fields, function(err, results, fields){
      if(err) throw err

      const id = results.affectedRows ? results.insertId : 0
      
      return res.status(201).json({success: true, id})
    })
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message })
  }
});

module.exports = accountsRouter