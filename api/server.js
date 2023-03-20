// SUNUCUYU BU DOSYAYA KURUN
const express= require("express");

const server = express();
const cors=require("cors")
const User=require("../api/users/model");


server.use(express.json()); //json istekleri karşılamak için
server.use(cors());

server.post("/api/users", async(req, res)=>{
    try{
        let user=req.body;
        if(!user.bio || !user.name)
        res.status(400).json({message:"Lütfen kullanıcı için bir name ve bio sağlayın" })
        else{
            let newUser = await User.insert(user)
                res.status(201).json(newUser)
            }
        }
        catch(error){
            res.status(500).json({message:"Veritabanına kaydedilirken bir hata oluştu"})
        }
    })

server.get("/api/users", async (req,res)=>{

    try {
        let allUsers=await User.find();
        res.json(allUsers);
    } catch(error){
        res.status(500).json({message:"Kullanıcı bilgileri alınamadı"})
    }

})

server.get("/api/users/:id", async (req,res)=>{

    try {
        let user=await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı"})
        }else{
            res.status(200).json(user)
        }
        
    } catch(error){
        res.status(500).json({message:"Kullanıcı bilgisi alınamadı"})
    }

})
server.put("/api/users/:id", async (req,res)=>{
//const {id}=req.params.id;
    try {
        let user=await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı"})
        } 
        else{
            let updatedRecord=req.body;
            if(!updatedRecord.name || !updatedRecord.bio){
            res.status(400).json({message:"Lütfen kullanıcı için name ve bio sağlayın"})
            }else{
            let updatedUser=await User.update(req.params.id, updatedRecord)
            res.status(200).json(updatedUser)
            }
    }
}
    catch(err){
        res.status(500).json({message:"Kullanıcı bilgisi alınamadı"})
    }
})

server.delete("/api/users/:id", async (req,res)=>{
//const {id}=req.params.id;
    try {
        let user=await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı"})
        }else{
            await User.remove(req.params.id);
            res.status(200).json(user)
        }
    } catch(err){
        res.status(500).json({message:"Kullanıcı silinemedi"})
    }

})

module.exports =server; // SERVERINIZI EXPORT EDİN {}
