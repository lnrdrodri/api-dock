# Dock - Desafio API Rest

- [Manual de Execução](#manual-de-execução)
- [Documentação](#documentação)

## Manual de Execução

1. Clone o repositório para a sua máquina
  ```bash
    git clone https://github.com/lnrdrodri/api-dock.git
  ```

2. Após clonar o repositório, instale as dependências com seu gerenciador de pacotes preferido.
  ```bash
    yarn
  ```

3. Lembre-se de criar o arquivo **.env** na raíz do projeto, utilize o **.env.example** como base para criar suas variáveis de ambiente.

4. Com o arquivo **.env** criado, e as dependências instaladas, agora é só iniciar o servidor digitando:
  ```bash
    yarn start
  ```
5. Pronto! Seu servidor já está rodando. 🚀
## Documentação

## Endpoints

### Accounts

**POST** /accounts

- **Descrição**: Cria uma nova conta
- **Retorno**: JSON
-  **Sucesso**: Status 201 - Retorna ID da conta criada
- **Falha**: Status 400 - Retorna erro encontrado

#### Parâmetros enviados no corpo da requisição (Body)

|Nome|Obrigatório|Descrição|
|--|--|--|
|idPessoa: int|Sim|ID da pessoa responsável pela conta|
|saldo: float|Sim|Saldo inicial da conta|
|limiteSaqueDiario: float|Sim|Valor máximo de saque diário da conta|
|tipoConta: int|Sim| Tipo da conta a ser criada|
---
**POST** /accounts/**:id**/deposity

- **Params**: Enviar o id da conta em que deseja fazer o depósito
- **Descrição**: Cria um novo depósito na conta informada
- **Retorno**: JSON
-  **Sucesso**: Status 201 - Retorna ID da conta em que o depósito foi feito
- **Falha**: Status 400 - Retorna erro encontrado

#### Parâmetros enviados no corpo da requisição (Body)

|Nome|Obrigatório|Descrição|
|--|--|--|
|valor: float|Sim|Valor do depósito|
|dataTransacao: date(AAAA-MM-DD)|Sim|Data da transação|

---
**GET** /accounts/**:id**/balance

- **Params**: Enviar o id da conta em que deseja consultar o saldo
- **Descrição**: Consulta o saldo da conta informada
- **Retorno**: JSON
-  **Sucesso**: Status 200 - Retorna o saldo da conta informada
- **Falha**: Status 400 - Retorna erro encontrado

#### Parâmetros enviados no corpo da requisição (Body)

|Nome|Obrigatório|Descrição|
|--|--|--|
|idConta: int|Sim|ID da conta que deseja consultar o saldo|

---
**POST** /accounts/**:id**/withdraw

- **Params**: Enviar o id da conta em que deseja realizar o saque
- **Descrição**: Realizar um saque na conta informada
- **Retorno**: JSON
-  **Sucesso**: Status 201 - Retorna ID da conta em que o saque foi feito
- **Falha**: Status 400 - Retorna erro encontrado

#### Parâmetros enviados no corpo da requisição (Body)

|Nome|Obrigatório|Descrição|
|--|--|--|
|valor: float|Sim|Valor do saque|
|dataTransacao: date(AAAA-MM-DD)|Sim|Data da transação|

---
**PATCH** /accounts/**:id**/block

- **Params**: Enviar o id da conta que deseja bloquear
- **Descrição**: Bloqueia a conta informada
- **Retorno**: JSON
-  **Sucesso**: Status 200 - Retorna true
- **Falha**: Status 400 - Retorna false

#### Não tem parâmetros para serem enviados no corpo da requisição (Body)

---
**GET** /accounts/**:id**/transactions

- **Params**: Enviar o id da conta que deseja consulta as transações
- **Descrição**: Consulta as transações da conta informada em determinado período, se as datas não forem informadas, retorna todas as transações
- **Retorno**: JSON
-  **Sucesso**: Status 200 - Array de transactions
- **Falha**: Status 400 - Retorna erro encontrado

#### Parâmetros enviados no corpo da requisição (Body)

|Nome|Obrigatório|Descrição|
|--|--|--|
|dtInicial: date(AAAA-MM-DD)|Não|Data inicial da consulta|
|dtFinal: date(AAAA-MM-DD)|Não|Data final da consulta|
