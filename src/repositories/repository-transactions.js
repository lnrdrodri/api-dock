const sql = require("../database/db")

const insertTransaction = async ({ idConta, valor, dataTransacao }) => {
  try {
      const query = "INSERT INTO transacoes(idConta, valor, dataTransacao) VALUES (?, ?, ?)"
      const fields = [
        idConta,
        valor,
        dataTransacao
      ]
      const res = await sql.query(query, fields)
      return {success: true, id: res[0].insertId}
  } catch (err) {
      return {success: false , err: err.message}
  }
}

module.exports = {
  insertTransaction
}