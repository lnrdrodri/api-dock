DROP TABLE IF EXISTS pessoas;
DROP TABLE IF EXISTS contas;
DROP TABLE IF EXISTS transacoes;

CREATE TABLE pessoas (
  idPessoa INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  dataNascimento DATE NOT NULL
) ENGINE = innodb;

INSERT INTO pessoas(nome, cpf, dataNascimento) VALUES ('Leonardo Docker', '489.510.498-25', '2000-06-28');

CREATE TABLE contas (
  idConta INT PRIMARY KEY AUTO_INCREMENT,
  idPessoa INT NOT NULL,
  saldo DECIMAL(14,2) DEFAULT 0.00,
  limiteSaqueDiario DECIMAL(14,2) DEFAULT 3000.00,
  flagAtivo BOOLEAN DEFAULT 1,
  tipoConta INT NOT NULL,
  dataCriacao DATE NOT NULL,
  FOREIGN KEY(idPessoa) REFERENCES pessoas(idPessoa)
) ENGINE = innodb;

CREATE TABLE transacoes (
  idTransacao INT PRIMARY KEY AUTO_INCREMENT,
  idConta INT NOT NULL,
  valor DECIMAL(14,2) NOT NULL,
  dataTransacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(idConta) REFERENCES contas(idConta)
) ENGINE = innodb;

delimiter $$

CREATE TRIGGER ai_atualizaSaldo
AFTER INSERT
ON transacoes FOR EACH ROW
BEGIN
  UPDATE contas SET saldo = saldo + NEW.valor WHERE contas.idConta = NEW.idConta;
END;
$$

delimiter ;