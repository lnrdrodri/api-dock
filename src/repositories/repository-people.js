const sql = require("../database/db")

const existPeople = async (idPessoa) => {
  const [rows] = await sql.query("SELECT idPessoa FROM pessoas WHERE idPessoa = ?", idPessoa)
  const exist = rows.length > 0 ? true : false
  return exist
}

module.exports = {
  existPeople
}