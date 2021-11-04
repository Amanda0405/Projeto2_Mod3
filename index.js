const express = require("express");
const app = express();

app.use(express.json());

const Conn = require(".model/conn/index");
Conn();

const port = 3000;

const pessoasRouter = require(".routers/pessoas.routes");
app.use("/pessoas", pessoasRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});