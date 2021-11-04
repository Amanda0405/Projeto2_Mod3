const express = require("express");
const router = express.Router();
const Paises = ("./../model/paises");

router.get("/", (req,res) =>{
    res.status(200).json({message:"Países"});
});

router.get("/listall", async(req,res) => {// Listar todos os países
    await Paises.find({}).then((paises) => {
        console.log(paises);
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message: "A lista de Paises não foi encontrada."});
        console.error(err);
    });
});

router.get("./listname/:nome", async (req,res) => { //Encontra o pais pelo nome
    const nome = req.params.nome;
    await Paises.findOne({nome:nome}).then((pais) => {
        console.log(pais);
        if(pais == null){
            res.status(404).json({message:"País não encontrado"});
        }else{
            res.status(200).json(pais);
        }
    }).catch((err) => {
        res.status(404).json({message:"Ops! Ocorreu um erro"});
        console.error(err);
    });
});

router.post("/add", async (req,res) =>{
    if(!req.body.nome){
        res.status(400).json({message: "O campo nome está vazio"});
        return;
    } else if( !req.body.populacao){
        res.status(400).json({message:"O campo população está vazio"});
        return;
    } else if(!req.body.linguaMae){
        res.status(400).json({message: "O campo lingua mãe está vazio"});
        return;
    } else if(!req.body.pib){
        res.status(400).json({message: "O campo PIB está vazio"});
        return;
    }
    await Paises.create(req.body).then(() =>{
        res.status(200).json({message:"País cadastrado com sucesso"});
    }).catch((err) =>{
        res.status(400).json({message: "Ops! Algo deu errado"});
        console.error(err);
    });
});

router.put("/update/:id", async (req, res) =>{
    const id = req.params.id;
    if(!id){
        res.status(400).json({message:"Está faltando Id na URL"});
        return
    }else if(!req.body.nome){
        res.status(400).json({message: "Nome não foi preenchido"});
        return;
    }else if(!req.body.populacao){
        res.status(400).json({message: "População não foi preenchida"});
        return;
    }
    else if(!req.body.linguaMae){
        res.status(400).json({message: "Lingua mãe não foi preenchida"});
        return;
    }
    else if(!req.body.pib){
        res.status(400).json({message: "PIB não foi preenchido"});
        return;
    }
    
    await Paises.updateOne({ _id:id},req.body).then(() => {
        res.status(200).json({message: "País atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Ops! Algo deu errado"});
    });
});

router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){
        await Paises.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "País deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "OPs! Algo deu errado"});
        });
    }else{
        res.status(400).json({message: "id precisa ter 24 caracteres"});
    }
});

module.exports = router