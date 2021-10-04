const sql = require("../database/db")
const repositoryPeople = require("../repositories/repository-people")

const existAccount = async (idConta) => {
  const [rows] = await sql.query("SELECT idConta FROM contas WHERE idConta = ?", idConta)
  const exist = rows.length > 0 ? true : false
  return exist
}

const blockedAccount = async (idConta) => {
  const [rows] = await sql.query("SELECT flagAtivo FROM contas WHERE idConta = ?", idConta)
  const blocked = rows[0].flagAtivo === 0 ? true : false
  return blocked
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
      
      const blocked = await blockedAccount(idConta)
      if (blocked) throw new Error("A conta informada está bloqueada, portanto não pode receber depósitos.")
      
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
      
      const blocked = await blockedAccount(idConta)
      if (blocked) throw new Error("A conta informada está bloqueada, portanto não é possível realizar saque.")

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

const blockAccount = async (idConta) => {
  try {
    const exist = await existAccount(idConta)
    if (!exist) throw new Error("Não foi possível realizar o bloqueio, porque essa conta não existe.")
    
    const res = await sql.query("UPDATE contas SET flagAtivo = 0 WHERE idConta = ?", idConta)
    
    if(res.changedRows === 0) throw new Error("Erro ao bloquear a conta.")

    return {success: true}
  } catch(err) {
    return {success: false};
  }
}

const allTransactions = async (idConta, {dtInicial = 0, dtFinal = 0}) => {
  try {
    const exist = await existAccount(idConta)
    if (!exist) throw new Error("Não foi possível encontrar as transações, essa conta não existe.")
    
    let query = `SELECT * FROM transacoes WHERE idConta = ?`
    if (dtInicial) query += ` AND dataTransacao >= '${dtInicial}'`
    if (dtFinal) query += ` AND dataTransacao <= '${dtFinal}'`

    const [rows] = await sql.query(query, idConta)

    return {success: true, rows}
  } catch(err) {
    return {success: false};
  }
}

module.exports = {
  insertAccount,
  deposityInAccount,
  balanceAccount,
  withdrawInAccount,
  blockAccount,
  allTransactions
}