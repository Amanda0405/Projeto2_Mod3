const express = require("express");
const router = express.Router();
const Cidade = require("./../model/cidades");

function verificacao(cidades,res){

    if(!cidades){
        res.status(204).json();
        return true;
    };
    return false;
};

function verificaParametro(cidades, res){
    if(!cidades.nome){
        res.status(400).json({message: "O campo nome está vazio"});
        return true;
    } else if( !cidades.qtdBairros){
        res.status(400).json({message:"O campo Quantidade de bairros está vazio"});
        return true;
    } else if(!cidades.populacao){
        res.status(400).json({message: "O campo população está vazio"});
        return true;
    } else if(!cidades.anivCidade){
        res.status(400).json({message: "O campo aniversário da cidade está vazio"});
        return true;
    };
};

router.get("/", (req,res) =>{
    res.status(200).json({message:"Cidades ok"});
});

router.get("/listAll", async(req,res) => {// Listar todas cidades
    await Cidade.find({}).then((cidades) => {
        //console.log(cidades);
        res.status(200).json(cidades);
    }).catch((err) => {
        res.status(204).json({message: "A lista de Cidades não foi encontrada."});
        console.error(err);
    });
});

router.get("/listName/:nome", async (req,res) => { //Encontra a cidade pelo nome
    const nome = req.params.nome;
    await Cidade.findOne({nome:nome}).then((cidades) => {
        if(cidades == null){
            res.status(404).json({message:"Cidade não encontrada"});
        }else{
            res.status(200).json(cidades);
        }
    }).catch((err) => {
        res.status(404).json({message:"Ops! Ocorreu um erro"});
        console.error(err);
    });
});

router.post("/add", async (req,res) =>{
    const cidades = req.body;
    if(verificaParametro(cidades,res)){
        return
    };
    await Cidade.create(req.body).then(() =>{
        res.status(201).json({message:"Cidade cadastrada com sucesso"});
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
        await Cidade.findOne({id:id}).then((cidades) => {
            if (verificacao(cidades, res)|| verificaParametro(req.body, res)){
                return;
            }else{
                Cidade.updateOne({ _id:req.params.id},req.body).then(() => {
                    res.status(200).json({message: "Cidade atualizada com sucesso"});
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
        await Cidade.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "Cidade deletada com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "Ops! Algo deu errado"});
        });
    }else{
        res.status(400).json({message: "id precisa ter 24 caracteres"});
    }
});

module.exports = router