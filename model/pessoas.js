const mongoose = require("mongoose");

const pessoasModel = new mongoose.Schema({
    nome: { type:String, required: true},
    altura:{type:Number, required: true},
    idade: {type:Number},
    dataCriacao: {type: Date, default: Date.now}

});

const Pessoa = mongoose.model("Pessoas", pessoasModel);

module.exports = Pessoa;