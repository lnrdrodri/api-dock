const sql = require("../database/db")
const repositoryPeople = require("../repositories/repository-people")
const repositoryTransactions = require("../repositories/repository-transactions")

const existAccount = async (idConta) => {
  const [rows] = await sql.query("SELECT idConta FROM contas WHERE idConta = ?", idConta)
  const exist = rows.length > 0 ? true : false
  return exist
}

const insertAccount = async ({ idPessoa, saldo, limiteSaqueDiario, tipoConta }) => {
  try {
      if (limiteSaqueDiario < 0) throw new Error("Você está tentando criar uma conta com limite de saque diário negativo.")
      
      const existPeople = await repositoryPeople.existPeople(idPessoa)
      if (!existPeople) throw new Error("Você está tentando criar uma conta para um ID inexistente.")

      const query = "INSERT INTO contas(idPessoa, saldo, limiteSaqueDiario, tipoConta, dataCriacao) VALUES (?, ?, ?, ?, NOW())"
      const fields = [
          idPessoa,
          saldo,
          limiteSaqueDiario,
          tipoConta
      ]
      const res = await sql.query(query, fields)
      return {success: true, id: res[0].insertId}
  } catch (err) {
      return {success: false , err: err.message}
  }
}

const deposityInAccount = async (idConta, { valor, dataTransacao }) => {
  try {
      if (valor < 0) throw new Error("Você está tentando depositar um valor inválido.")
      
      const exist = await existAccount(idConta)
      if (!exist) throw new Error("Você está tentando depositar em uma conta inexistente.")

      // const res = await repositoryTransactions.insertTransaction(idConta, valor, dataTransacao)
      const query = "INSERT INTO transacoes(idConta, valor, dataTransacao) VALUES (?, ?, ?)"
      const fields = [
        idConta,
        valor,
        dataTransacao
      ]
      const res = await sql.query(query, fields)
      if (res.insertId <= 0) {
        throw new Error("Erro ao depositar.")
      }
      return {success: true, id: idConta}
  } catch (err) {
      return {success: false , err: err.message}
  }
}

const balanceAccount = async (idConta) => {
  try {
    const exist = await existAccount(idConta)
    if (!exist) throw new Error("Não é possível consultar o saldo, essa conta não existe.")
    
    const [rows] = await sql.query("SELECT saldo FROM contas WHERE idConta = ?", idConta)
    
    return {success: true, saldo: rows[0].saldo}
  } catch(err) {
    return {success: false};
  }
}

const withdrawInAccount = async (idConta, { valor, dataTransacao }) => {
  try {
      if (valor <= 0) throw new Error("Você deve informar um valor positivo e maior que 0 (zero) para realizar o saque.")
      // Transformo o valor em negativo, para que no banco de dados tenha uma referência para separar as transações
      // por saque e depósito usando os valores positivos e negativos
      valor *= -1;

      const balance = await balanceAccount(idConta)
      if (!balance.success) throw new Error("Erro ao consultar saldo da conta.")

      if((balance.saldo - Math.abs(valor)) < 0) throw new Error("Saldo insuficiente para realizar esse depósito.")

      const query = "INSERT INTO transacoes(idConta, valor, dataTransacao) VALUES (?, ?, ?)"
      const fields = [
        idConta,
        valor,
        dataTransacao
      ]
      const res = await sql.query(query, fields)
      if (res.insertId <= 0) {
        throw new Error("Erro ao sacar.")
      }
      return {success: true, id: idConta}
  } catch (err) {
      return {success: false , err: err.message}
  }
}

module.exports = {
  insertAccount,
  deposityInAccount,
  balanceAccount,
  withdrawInAccount
}