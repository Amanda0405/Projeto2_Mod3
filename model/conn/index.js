const mongoose = require("mongoose");

function Conn(){
    mongoose.connect("mongodb://localhost:27017/API", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MONGODB está conectado")
    }).catch((err) => {
        console.error(err);
    })
}

module.exports = Conn;