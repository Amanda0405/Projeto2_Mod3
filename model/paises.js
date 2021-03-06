const mongoose = require("mongoose");

const paisesModel = new mongoose.Schema({
    nome: { type:String, required: true},
    populacao:{type:Number, required: true},
    linguaMae: {type:String, required: true},
    pib: {type:Number, required: true},
    dataCriacao: {type: Date, default: Date.now}

});

const Pais = mongoose.model("Paises", paisesModel);

module.exports = Pais;