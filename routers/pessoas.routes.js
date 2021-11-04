const express = require("express");
const router = express.Router();
const Pessoa = require("./../model/pessoas");

router.get("/", (req,res) =>{
    res.status(200).json({message:"Rota pessoas ok"});
});

router.get("/listar", async(req,res) => {
    await Pessoa.find({}).then((pessoas) => {
        console.log(pessoas);
        res.status(200).json(pessoas);
    }).catch((err) => {
        res.status(404).json({message: "Nada foi encontrado"});
        console.error(err);
    });
});

router.get("./findnome/:nome", async (req,res) => {
    const nome = req.params.nome;
    await Pessoa.findOne({nome:nome}).then((pessoa) => {
        console.log(pessoa);
        if(pessoa == null){
            res.status(404).json({message:"Nome não encontrado"});
        }else{
            res.status(200).json(pessoa);
        }
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console,error(err);
    });
});

router.post("/add", async (req,res) =>{
    if(!req.body.nome){
        res.status(400).json({message: "O campo nome está vazio"});
        return;
    } else if( !req.body.altura){
        res.status(400).json({message:"O campo altura está vazio"});
        return;
    } else if(!req.body.idade){
        res.status(400).json({message: "O campo idade está vazio"});
        return;
    }
    await Pessoa.create(req.body).then(() =>{
        res.status(200).json({message:"Cadastrado com sucesso"});
    }).catch((err) =>{
        res.status(400).json({message: "Ops! Algo deu errado"});
        console.error(err);
    });
});

router.put("/update/:id", async (req, res) =>{
    const id = re.params.id;
    if(!id){
        res.status(400).json({message:"Está faltando Id na URL"});
        return
    }else if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;
    }else if(!req.body.altura){
        res.status(400).json({message: "esta faltando altura"});
        return;
    }
    else if(!req.body.idade){
        res.status(400).json({message: "esta faltando idade"});
        return;
    }
    
    await Pessoa.updateOne({ _id:id},req.body).then(() => {
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "algo esta errado"});
    });
});

router.delete('/del/:id', async (req,res) => {
    if( req.params.id.length == 24){
        await Pessoa.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "Deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "algo esta errado"});
        });
    }else{
        res.status(400).json({message: "id precisa ter 24 caracteres"});
    }
});

module.exports = router