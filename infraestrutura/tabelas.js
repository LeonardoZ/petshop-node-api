
class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = `
             CREATE TABLE if not exists atendimento(
                id int NOT NULL AUTO_INCREMENT,
                cliente VARCHAR(50) NOT NULL,
                pet VARCHAR(20),
                servico VARCHAR(20) NOT NULL,
                status VARCHAR(20) NOT NULL,
                observacoes TEXT,
                data DATETIME NOT NULL,
                data_criacao DATETIME NOT NULL,
                PRIMARY KEY (id));
            `;
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log("Tabela atendimento criada com sucesso")
            }
        });
    }
}

module.exports = Tabelas;