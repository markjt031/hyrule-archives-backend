const db=require('../models')
const mongoose=require('mongoose')

const getAllMonsters=(req, res)=>{
    db.Monster.find({}).sort({no: 1}).then((foundMonsters)=>{
        if (!foundMonsters){
            res.status(404).json({message: 'Monsters not found'})
        }
        else{
            res.status(200).json({data: foundMonsters})
        }
    })
}

const getOneMonster=(req, res)=>{
    db.Monster.findOne({_id: req.params.id}).then((foundMonster)=>{
        if (!foundMonster){
            res.status(404).json({message: 'Could not find Monster'})
        }
        else{
            res.status(200).json({data: foundMonster})
        }
    })
}
const createMonster=(req, res)=>{
    // req.body.userId=req.session.currentUser
    req.body.userId=new mongoose.Types.ObjectId(req.body.userId)
    if (req.file){
        req.body.image=req.file.location;
    }
    db.Monster.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: "monster already exists"})
    })
}
const deleteMonster=(req, res)=>{
    db.Monster.findByIdAndDelete(req.params.id).then((deletedMonster=>{
        if (!deleteMonster){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedMonster, message: "Monster deleted"})
        }
    }))
}

const updateMonster=(req, res)=>{
    if (req.file){
        req.file.image=req.file.location
    }
    db.Monster.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedMonster)=>{
        if (!updateMonster){
            res.status(400).json({message: "Could not update"})
        }
        else{
            res.status(200).json({data: updatedMonster, message: "Monster updated"})
        }
    })
}


module.exports={
    createMonster,
    deleteMonster,
    updateMonster,
    getAllMonsters,
    getOneMonster
}