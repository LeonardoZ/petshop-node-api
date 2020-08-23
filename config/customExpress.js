module.exports = () => {
    const consign = require("consign");
    const express = require("express");
    const app = express();

    consign().include("/controller").into(app);
    return app;
}