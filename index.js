const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const app = customExpress();

conexao.connect(erro => {
    if (erro) {
        console.log(erro);
    }
    console.log("conectado com sucesso");
    const tabelas =  new Tabelas();
    tabelas.init(conexao);
    app.listen(3000, () => console.log("Rodando no porta 3000"));
})

