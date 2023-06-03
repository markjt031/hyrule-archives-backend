const db=require('../models')
const mongoose=require('mongoose')


const getAllShrines=(req, res)=>{
    db.Shrine.find({}).sort({no: 1}).then((foundShrines)=>{
        if (!foundShrines){
            res.status(404).json({message: 'Shrine not found'})
        }
        else{
            res.status(200).json({data: foundShrines})
        }
    })
}

const getOneShrine=(req, res)=>{
    db.Shrine.findOne({_id: req.params.id}).then((foundShrine)=>{
        if (!foundShrine){
            res.status(404).json({message: 'Could not find shrine'})
        }
        else{
            res.status(200).json({data: foundShrine})
        }
    })
}
const createShrine=(req, res)=>{
    // req.body.userId=req.session.currentUser
    // req.body.userId=new mongoose.Types.ObjectId(req.body.userId)
    console.log(req.files)
    const fileArray=[]
    if (req.files){
        for (let i=0; i<req.files.length;i++){
            if (i===0){
                req.body.locationImage=req.files[0].location
            }
            else{
                fileArray[i-1]=req.files[i].location
            }
        }
    }
    req.body.images=fileArray
    if (!req.body.name){
        res.status(400).json({message: 'could not create'})
    }
    db.Shrine.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: "shrine already exists"})
    })
}
const deleteShrine=(req, res)=>{
    db.Shrine.findByIdAndDelete(req.params.id).then((deletedShrine=>{
        if (!deletedShrine){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedShrine, message: "shrine deleted"})
        }
    }))
}

const updateShrine=(req, res)=>{
    if (req.files){
        for (let i=0; i<req.files.length;i++){
            req.body.images[i]=req.files[i].location
        }
    }
    if (!req.body.no || !req.body.name){
        res.status(400).json({message: 'could not update'})
    }
    db.Shrine.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedShrine)=>{
        if (!updatedShrine){
            res.status(400).json({message: "Could not update"})
        }
        else{
            res.status(200).json({data: updatedShrine, message: "creature shrine"})
        }
    })
}


module.exports={
    createShrine,
    deleteShrine,
    updateShrine,
    getAllShrines,
    getOneShrine
}