module.exports = () => {
    const consign = require("consign");
    const express = require("express");
    const bodyParser = require("body-parser");

    const app = express();
    app.use(bodyParser.json());

    consign().include("/controller").into(app);
    return app;
}