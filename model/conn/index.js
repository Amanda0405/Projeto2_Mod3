const mongoose = require("mongoose");


//FUNÇÃO DE CONEXÃO
async function Conn(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_BASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then (() => {
        console.log("MONGODB está conectado")
    }).catch((err) => {
        console.error(err);
    });
};

module.exports = Conn;