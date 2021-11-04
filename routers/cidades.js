const express = require("express");
const router = express.Router();
const Cidades = ("./../model/paises");

router.get("/", (req,res) =>{
    res.status(200).json({message:"Cidades"});
});

router.get("/listall", async(req,res) => {// Listar todas cidades
    await Cidades.find({}).then((cidades) => {
        console.log(cidades);
        res.status(200).json(cidades);
    }).catch((err) => {
        res.status(404).json({message: "A lista de Cidades não foi encontrada."});
        console.error(err);
    });
});

router.get("./listname/:nome", async (req,res) => { //Encontra a cidade pelo nome
    const nome = req.params.nome;
    await Cidades.findOne({nome:nome}).then((cidade) => {
        console.log(cidade);
        if(cidade == null){
            res.status(404).json({message:"Cidade não encontrada"});
        }else{
            res.status(200).json(cidade);
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
    } else if( !req.body.qtdBairros){
        res.status(400).json({message:"O campo Quantidade de bairros está vazio"});
        return;
    } else if(!req.body.populacao){
        res.status(400).json({message: "O campo população está vazio"});
        return;
    } else if(!req.body.anivCidade){
        res.status(400).json({message: "O campo aniversário da cidade está vazio"});
        return;
    }
    await Cidades.create(req.body).then(() =>{
        res.status(200).json({message:"Cidade cadastrado com sucesso"});
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
    }else if(!req.body.qtdBairros){
        res.status(400).json({message: "Quantidade de bairros não foi preenchida"});
        return;
    }
    else if(!req.body.populacao){
        res.status(400).json({message: "População não foi preenchida"});
        return;
    }
    else if(!req.body.anivCidade){
        res.status(400).json({message: "Aniversário da cidade não foi preenchido"});
        return;
    }
    
    await Cidades.updateOne({ _id:id},req.body).then(() => {
        res.status(200).json({message: "Cidade atualizada com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Ops! Algo deu errado"});
    });
});

router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){
        await Cidades.deleteOne({_id:req.params.id}).then(() => {
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