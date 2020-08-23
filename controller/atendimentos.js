
module.exports = (app) => {
    app.get("/atendimentos", (_, res) => res.send("Você está na rota atendimentos"));
}