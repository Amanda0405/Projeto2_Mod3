const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json());

const Conn = require("./model/conn/index");
Conn();

const paisesRouter = require("./routes/paises.routes");
app.use("/paises", paisesRouter);

const estadosRouter = require("./routes/estados.routes");
app.use("/estados", estadosRouter);

const cidadesRouter = require("./routes/cidades.routes");
app.use("/cidades", cidadesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});