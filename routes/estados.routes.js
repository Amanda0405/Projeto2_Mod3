const express = require("express");
const router = express.Router();
const Estado = require("./../model/estados");

function verificacao(estados,res){

    if(!estados){
        res.status(204).json();
        return true;
    };
    return false;
};

function verificaParametro(estados, res){
    if(!estados.nome){
        res.status(400).json({message: "O campo nome está vazio"});
        return;
    } else if(!estados.regiao){
        res.status(400).json({message:"O campo região está vazio"});
        return;
    } else if(!estados.populacao){
        res.status(400).json({message: "O campo população está vazio"});
        return;
    } else if(!estados.salarioMin){
        res.status(400).json({message: "O campo salário minímo está vazio"});
        return;
    };
};


router.get("/", (req,res) =>{
    res.status(200).json({message:"Estados"});
});

router.get("/listall", async(req,res) => {// Listar todos os Estado
    await Estado.find({}).then((estados) => {
        //console.log(estados);
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message: "A lista de Estados não foi encontrada."});
        console.error(err);
    });
});

router.get("/listName/:nome", async (req,res) => { //Encontra o estado pelo nome
    const nome = req.params.nome;
    await Estado.findOne({nome:nome}).then((estados) => {
        //console.log(estado);
        if(estados == null){
            res.status(404).json({message:"Estado não encontrado"});
        }else{
            res.status(200).json(estados);
        }
    }).catch((err) => {
        res.status(404).json({message:"Ops! Ocorreu um erro"});
        console.error(err);
    });
});

router.post("/add", async (req,res) =>{
    const estados = req.body;
    if(verificaParametro(estados,res)){
        return
    };
    await Estado.create(req.body).then(() =>{
        res.status(200).json({message:"Estado cadastrado com sucesso"});
    }).catch((err) =>{
        res.status(400).json({message: "Ops! Algo deu errado"});
        console.error(err);
    });
});

router.put("/update/:id", async (req, res) =>{
    const id = req.params.id;
    if(!id){
        res.status(400).json({message: "esta faltando id na URL"});
        return;
    } else{
        await Estado.findOne({id:id}).then((estados) => {
            if (verificacao(estados, res)|| verificaParametro(req.body, res)){
                return;
            }else{
                Estado.updateOne({ _id:req.params.id},req.body).then(() => {
                    res.status(200).json({message: "Estado atualizado com sucesso"});
                }).catch((err) => {
                    console.error(err);
                    res.status(400).json({message: "Ops! Algo deu errado"});
                });
            };
        }).catch((err) => {
            res.status(404).json({message:"Ops! Ocorreu um erro"});
            console.error(err);
        });
    };
});

router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){
        await Estado.deleteOne({_id:req.params.id}).then(() => {
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