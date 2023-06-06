const db=require('../models')
const mongoose=require('mongoose')



const getAllKoroks=(req, res)=>{
    db.Korok.find({}).then((foundKoroks)=>{
        if (!foundKoroks){
            res.status(404).json({message: 'Korok not found'})
        }
        else{
            res.status(200).json({data: foundKoroks})
        }
    })
}
const filterByRegion=(req, res)=>{
    if (req.query){
        const region=req.query.region
        
        db.Korok.find({'region': {$regex: region, $options: "i"}}).then((foundKoroks)=>{
            if (!foundKoroks){
                res.status(404).json({message: 'Korok not found'})
            }
            else{
                res.status(200).json({data: foundKoroks})
            }
        }).catch((err)=>console.log(err))
    }
}

const getOneKorok=(req, res)=>{
    db.Korok.findOne({_id: req.params.id}).then((foundKorok)=>{
        if (!foundKorok){
            res.status(404).json({message: 'Could not find korok'})
        }
        else{
            res.status(200).json({data: foundKorok})
        }
    })
}
const createKorok=(req, res)=>{
    //req.body.userId=req.session.currentUser
    req.body.userId=new mongoose.Types.ObjectId(req.body.userId)
    console.log(req.body)
    console.log(req.files)

    
        if (req.files){
            for (let i=0; i<req.files.length;i++){
                if (req.files[i].fieldname==='locationImage'){
                    req.body.locationImage=req.files[i].location
                }
                else{
                    req.body.korokImage=req.files[i].location
                }
            }
        }
        else{
            res.status(400).json({message: "Could not create. Images are required."})
        }
    
    db.Korok.create(req.body).then((result)=>{
        if(!result){
            res.statue(400).json({message: 'Could not create'})
        }
        else{
            console.log(result)
            res.status(201).json(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: "korok already exists"})
    })
}
const deleteKorok=(req, res)=>{
    db.Korok.findByIdAndDelete(req.params.id).then((deletedKorok=>{
        if (!deletedKorok){
            res.status(400).json({message: "Could not delete"})
        }
        else{
            res.status(200).json({data: deletedKorok, message: "korok deleted"})
        }
    }))
}

const updateKorok=(req, res, next)=>{
    if (req.files){
        for (let i=0; i<req.files.length; i++){
            if (req.files[i].fieldname==='locationImage'){
                req.body.locationImage=req.files[i]
            }
            if (req.files[i].fieldname==='korokImage'){
                req.body.locationsImage=req.files[i]
            }
        }
    }
    db.Korok.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedKorok)=>{
        if (!updatedKorok){
            res.status(400).json({message: "Could not update"})
        }
        else{
            console.log(updatedKorok)
            console.log('korok updated')
            res.status(200).json({data: updatedShrine, message: "updated korok"})
        }
    })
}


module.exports={
    createKorok,
    deleteKorok,
    updateKorok,
    getAllKoroks,
    getOneKorok,
    filterByRegion
}