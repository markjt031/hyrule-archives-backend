const db=require('../models')

const getAllEquipment=(req, res)=>{
    db.Equipment.find({}).sort({no: 1}).then((foundEquipment)=>{
        if (!foundEquipment){
            res.status(404).json({message: 'Equipment not found'})
        }
        else{
            res.status(200).json({data: foundEquipment})
        }
    })
}

const getOneEquipment=(req, res)=>{
    db.Equipment.findOne({_id: req.params.id}).then((foundEquipment)=>{
        if (!foundEquipment){
            res.status(404).json({message: 'Could not find Equipment'})
        }
        else{
            res.status(200).json({data: foundEquipment})
        }
    })
}
const createEquipment=(req, res)=>{
    req.body.userId=req.session.currentUser
    if (req.file){
        req.body.image=req.file.location;
    }
    db.Equipment.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: "equipment already exists"})
    })
}
const deleteEquipment=(req, res)=>{
    db.Equipment.findByIdAndDelete(req.params.id).then((deletedEquipment=>{
        if (!deleteEquipment){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedEquipment, message: "Equipment deleted"})
        }
    }))
}

const updateEquipment=(req, res)=>{
    if (req.file){
        req.file.image=req.file.location
    }
    db.Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedEquipment)=>{
        if (!updateEquipment){
            res.status(400).json({message: "Could not update"})
        }
        else{
            res.status(200).json({data: updatedEquipment, message: "Equipment updated"})
        }
    })
}


module.exports={
    createEquipment,
    deleteEquipment,
    updateEquipment,
    getAllEquipment,
    getOneEquipment
}
