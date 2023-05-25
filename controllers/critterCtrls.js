const db=require('../models')

const getAllCritters=(req, res)=>{
    db.Critter.find({}).then((foundCritters)=>{
        if (!foundCritters){
            res.status(404).json({message: 'Critters not found'})
        }
        else{
            res.status(200).json({data: foundCritters})
        }
    })
}

const getOneCritter=(req, res)=>{
    db.Critter.findOne({_id: req.params.id}).then((foundCritter)=>{
        if (!foundCritter){
            res.status(404).json({message: 'Could not find Critter'})
        }
        else{
            res.status(200).json({data: foundCritter})
        }
    })
}
const createCritter=(req, res)=>{
    req.body.userId=req.session.currentUser
    if (req.file){
        req.body.image=req.file.location;
    }
    db.Critter.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    })
}
const deleteCritter=(req, res)=>{
    db.Critter.findByIdAndDelete(req.params.id).then((deletedCritter=>{
        if (!deleteCritter){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedCritter, message: "Critter deleted"})
        }
    }))
}

const updateCritter=(req, res)=>{
    if (req.file){
        req.file.image=req.file.location
    }
    db.Critter.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedCritter)=>{
        if (!updateCritter){
            res.status(400).json({message: "Could not update"})
        }
        else{
            res.status(200).json({data: updatedCritter, message: "Critter updated"})
        }
    })
}


module.exports={
    createCritter,
    deleteCritter,
    updateCritter,
    getAllCritters,
    getOneCritter
}