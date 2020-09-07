const Atendimento = require("../models/atendimento");

module.exports = (app) => {
  app.get("/atendimentos", (_, res) => {
    (async () => {
      try {
        const resultado = await new Atendimento().lista();
        res.send(resultado);
      } catch (error) {
        res.status(400).send(error);
      }
    })();
  });

  app.get("/atendimentos/:id", (req, res) => {
    (async () => {
      try {
        const id = parseInt(req.params.id);
        const resultado = await new Atendimento().buscaPorId(id);
        res.send(resultado);
      } catch (error) {
        res.status(400).send(error);
      }
    })();
  });
  
  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    (async () => {
      try {
        const resultado = await new Atendimento().adiciona(atendimento);
        res.status(201).send(resultado);
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    })();
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const atendimento = req.body;
    const id = parseInt(req.params.id);
    (async () => {
      try {
        const resultado = await new Atendimento().altera(id, atendimento);
        res.status(200).send(resultado);
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    })();
  });

  app.delete("/atendimentos/:id", (req, res) => {
    (async () => {
      try {
        const id = parseInt(req.params.id);
        const resultado = await new Atendimento().remover(id);
        res.send(resultado);
      } catch (error) {
        res.status(400).send(error);
      }
    })();
  });

};
