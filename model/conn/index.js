const mongoose = require("mongoose");

function Conn(){
    mongoose.connect("mongodb+srv://amandasilva:MDljKaJbPRFFzWwV@cluster0.mg4ww.mongodb.net/test",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MONGODB está conectado")
    }).catch((err) => {
        console.error(err);
    })
}

module.exports = Conn;