const db=require('../models')

const getAllMaterials=(req, res)=>{
    db.Material.find({}).then((foundMaterials)=>{
        if (!foundMaterials){
            res.status(404).json({message: 'Materials not found'})
        }
        else{
            res.status(200).json({data: foundMaterials})
        }
    })
}

const getOneMaterial=(req, res)=>{
    db.Material.findOne({_id: req.params.id}).then((foundMaterial)=>{
        if (!foundMaterial){
            res.status(404).json({message: 'Could not find Material'})
        }
        else{
            res.status(200).json({data: foundMaterial})
        }
    })
}
const createMaterial=(req, res)=>{
    req.body.userId=req.session.currentUser
    if (req.file){
        req.body.image=req.file.location;
    }
    db.Material.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    })
}
const deleteMaterial=(req, res)=>{
    db.Material.findByIdAndDelete(req.params.id).then((deletedMaterial=>{
        if (!deleteMaterial){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedMaterial, message: "Material deleted"})
        }
    }))
}

const updateMaterial=(req, res)=>{
    if (req.file){
        req.file.image=req.file.location
    }
    db.Material.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedMaterial)=>{
        if (!updateMaterial){
            res.status(400).json({message: "Could not update"})
        }
        else{
            res.status(200).json({data: updatedMaterial, message: "Material updated"})
        }
    })
}


module.exports={
    createMaterial,
    deleteMaterial,
    updateMaterial,
    getAllMaterials,
    getOneMaterial
}