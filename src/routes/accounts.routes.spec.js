const request = require("supertest")
const app = require("../server")
/**
 * Não tenho muito familiaridade com testes,
 * mas eles são os próximos itens da minha lista
 * de estudos, em 15 min aprendi como montar esse
 * teste, e decidi deixar ele no desafio, para
 * mostrar a vocês que mesmo que eu não saiba
 * alguma stack vocês estejam pedindo, eu estou
 * disposto a estudar e aprende-lá.
 */
describe('Rota: Accounts', () => {
  it('should be able to creat an account', async () => {
    const res = await request(app).post("/accounts").send({
      "idPessoa": 1,
      "saldo": 0.00,
      "limiteSaqueDiario": 1500.00,
      "tipoConta": 1
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("success")
    expect(res.body).toHaveProperty("id")
  });
});
