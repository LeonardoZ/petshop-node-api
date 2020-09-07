const conexao = require("../infraestrutura/conexao");
const moment = require("moment");

function validaData(validacoes, data, dataCriacao) {
  const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
  validacoes.push({
    nome: "data",
    mensagem: "Data deve ser maior ou igual a atual",
    valido: dataEhValida,
  });
}

function validaCliente(validacoes, cliente) {
  const clienteEhValido = cliente.length > 4;
  validacoes.push({
    nome: "cliente",
    mensagem: "Cliente deve ter ao menos 5 caracteres",
    valido: clienteEhValido,
  });
}

function validaAtendimento(validacoes) {
  const erros = validacoes.filter((v) => !v.valido);
  return [erros, erros.length > 0];
}

const formataAtendimento = (atendimento) => {
  if (Object.keys(atendimento).length === 0) {
      return {};
  }
  return {
    ...atendimento,
    data: moment(atendimento.data, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY"),
    data_criacao: moment(atendimento.data_criacao, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY"),
  };
};

class Atendimento {
  lista() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM atendimento";
      // formatar
      conexao.query(sql, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado.map(formataAtendimento));
      });
    });
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM atendimento WHERE id = ?";
      // formatar
      conexao.query(sql, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(formataAtendimento(resultado[0] || {}));
      });
    });
  }

  altera(id, valores) {
    return new Promise((resolve, reject) => {
      const validacoes = [];
      if (valores.data) {
        valores.data = moment(valores.data, "DD/MM/YYYY").format(
          "YYYY-MM-DD HH:mm:ss"
        );
        validaData(validacoes, valores.data, valores.dataCriacao);
      }
      if (valores.cliente) {
        validaCliente(validacoes, valores.cliente);
      }
      const [erros, existemErros] = validaAtendimento(validacoes);
      if (existemErros) {
        return reject(erros);
      }
      const sql = `UPDATE atendimento SET ? WHERE id = ?`;
      conexao.query(sql, [valores, id], (erro, resultados) => {
        if (erro) {
          reject(erro);
        } else {
          resolve({ ...valores, id });
        }
      });
    });
  }

  adiciona(atendimento) {
    return new Promise((resolve, reject) => {
      const validacoes = [];
      const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
      const data = moment(atendimento.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const atendimentoDatado = {
        ...atendimento,
        data_criacao: dataCriacao,
        data,
      };
      validaData(validacoes, atendimento.data, atendimento.dataCriacao);
      validaCliente(validacoes, atendimento.cliente);
      const [erros, existemErros] = validaAtendimento(validacoes);
      if (existemErros) {
        return reject(erros);
      }
      const sql = `
            INSERT INTO atendimento SET ?
        `;
      conexao.query(sql, atendimentoDatado, (erro, _) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(atendimento);
        }
      });
    });
  }

  remover(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM atendimento WHERE id = ?";

      conexao.query(sql, id, (erro, _) => {
        if (erro) {
          return reject(erro);
        }
        return resolve({ id });
      });
    });
  }
}

module.exports = Atendimento;
