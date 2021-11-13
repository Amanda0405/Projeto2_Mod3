const express = require("express");
const router = express.Router();
const Pais = require ("./../model/paises");

function verificacao(paises,res){

    if(!paises){
        res.status(204).json();
        return true;
    };
    return false;
};

function verificaParametro(paises, res){
    if(!paises.nome){
        res.status(400).json({message: "O campo nome está vazio"});
        return;
    } else if(!paises.populacao){
        res.status(400).json({message:"O campo população está vazio"});
        return;
    } else if(!paises.linguaMae){
        res.status(400).json({message: "O campo lingua mãe está vazio"});
        return;
    } else if(!paises.pib){
        res.status(400).json({message: "O campo PIB está vazio"});
        return;
    };
};

router.get("/", (req,res) =>{
    res.status(200).json({message:"Países"});
});

router.get("/listall", async(req,res) => {// Listar todos os países
    await Pais.find({}).then((paises) => {
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message: "A lista de Países não foi encontrada."});
        console.error(err);
    });
});

router.get("/listName/:nome", async (req,res) => { //Encontra o pais pelo nome
    const nome = req.params.nome;
    await Pais.findOne({nome:nome}).then((paises) => {
        if(paises == null){
            res.status(404).json({message:"País não encontrado"});
        }else{
            res.status(200).json(paises);
        }
    }).catch((err) => {
        res.status(404).json({message:"Ops! Ocorreu um erro"});
        console.error(err);
    });
});

router.post("/add", async (req,res) =>{
    const paises = req.body;
    if(verificaParametro(paises,res)){
        return
    };
    await Pais.create(req.body).then(() =>{
        res.status(200).json({message:"País cadastrado com sucesso"});
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
        await Pais.findOne({id:id}).then((paises) => {
            if (verificacao(paises, res)|| verificaParametro(req.body, res)){
                return;
            }else{
                Pais.updateOne({ _id:req.params.id},req.body).then(() => {
                    res.status(200).json({message: "País atualizado com sucesso"});
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
        await Pais.deleteOne({_id:req.params.id}).then(() => {
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