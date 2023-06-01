const db=require('../models')
const mongoose=require('mongoose')


const getAllCreatures=(req, res)=>{
    db.Creature.find({}).sort({no: 1}).then((foundCreatures)=>{
        if (!foundCreatures){
            res.status(404).json({message: 'Creatures not found'})
        }
        else{
            res.status(200).json({data: foundCreatures})
        }
    })
}

const getOneCreature=(req, res)=>{
    db.Creature.findOne({_id: req.params.id}).then((foundCreature)=>{
        if (!foundCreature){
            res.status(404).json({message: 'Could not find creature'})
        }
        else{
            res.status(200).json({data: foundCreature})
        }
    })
}
const createCreature=(req, res)=>{
    req.body.userId=req.session.currentUser
    if (req.file){
        req.body.image=req.file.location;
    }
    db.Creature.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: "creature already exists"})
    })
}
const deleteCreature=(req, res)=>{
    db.Creature.findByIdAndDelete(req.params.id).then((deletedCreature=>{
        if (!deleteCreature){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedCreature, message: "creature deleted"})
        }
    }))
}

const updateCreature=(req, res)=>{
    if (req.file){
        req.file.image=req.file.location
    }
    db.Creature.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedCreature)=>{
        if (!updateCreature){
            res.status(400).json({message: "Could not update"})
        }
        else{
            res.status(200).json({data: updatedCreature, message: "creature updated"})
        }
    })
}


module.exports={
    createCreature,
    deleteCreature,
    updateCreature,
    getAllCreatures,
    getOneCreature
}