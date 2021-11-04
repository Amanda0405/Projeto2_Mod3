const express = require("express");
const router = express.Router();
const Estados = ("./../model/estados");

router.get("/", (req,res) =>{
    res.status(200).json({message:"Estados"});
});

router.get("/listall", async(req,res) => {// Listar todos os estados
    await Estados.find({}).then((estados) => {
        console.log(estados);
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message: "A lista de Estados não foi encontrada."});
        console.error(err);
    });
});

router.get("./listname/:nome", async (req,res) => { //Encontra o estado pelo nome
    const nome = req.params.nome;
    await Estados.findOne({nome:nome}).then((estado) => {
        console.log(estado);
        if(estado == null){
            res.status(404).json({message:"Estado não encontrado"});
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
    } else if( !req.body.regiao){
        res.status(400).json({message:"O campo região está vazio"});
        return;
    } else if(!req.body.populacao){
        res.status(400).json({message: "O campo população está vazio"});
        return;
    } else if(!req.body.salarioMin){
        res.status(400).json({message: "O campo salário minímo está vazio"});
        return;
    }
    await Estados.create(req.body).then(() =>{
        res.status(200).json({message:"Estado cadastrado com sucesso"});
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
    }else if(!req.body.regiao){
        res.status(400).json({message: "Região não foi preenchida"});
        return;
    }
    else if(!req.body.populacao){
        res.status(400).json({message: "População não foi preenchida"});
        return;
    }
    else if(!req.body.salarioMin){
        res.status(400).json({message: "Salário Minímo não foi preenchido"});
        return;
    }
    
    await Estados.updateOne({ _id:id},req.body).then(() => {
        res.status(200).json({message: "Estado atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Ops! Algo deu errado"});
    });
});

router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){
        await Estados.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "Estado deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "OPs! Algo deu errado"});
        });
    }else{
        res.status(400).json({message: "id precisa ter 24 caracteres"});
    }
});

module.exports = router