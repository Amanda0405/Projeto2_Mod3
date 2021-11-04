const express = require("express");
const app = express();

app.use(express.json());

const Conn = require("./model/conn/index");
Conn();

const port = 3000;

const paisesRouter = require("./routers/paises");
app.use("/paises", paisesRouter);

const estadosRouter = require("./routers/estados");
app.use("/estados", estadosRouter);

const cidadesRouter = require("./routers/cidades");
app.use("/cidades", cidadesRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});