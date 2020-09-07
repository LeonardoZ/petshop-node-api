const mysql = require("mysql");
const conexao = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "dev",
    password: "devpass",
    database: "petshop"
})

module.exports = conexao;