const db=require('../models')
const mongoose=require('mongoose')



const getAllShrines=(req, res)=>{
    db.Shrine.find({}).sort({name: 1}).then((foundShrines)=>{
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
    //req.body.userId=req.session.currentUser
    req.body.userId=new mongoose.Types.ObjectId(req.body.userId)
    console.log(req.body)
    console.log(req.files)

    const fileArray=[]
    console.log(!req.files)
        if (req.files){
            for (let i=0; i<req.files.length;i++){
                if (req.files[i].fieldname==='locationImage'){
                    req.body.locationImage=req.files[0].location
                }
                else{
                    fileArray.push(req.files[i].location)
                }
            }
            req.body.images=fileArray
        }
    
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

const updateShrine=(req, res, next)=>{
    
   //All of the following is to process any image uploads and change req.body to have the correct
   //Images under the correct fieldnames. It should keep unchanged images the same and replace changed
   //images with the file uploads
    const changedIndexArray=[]
    if (req.body.changedIndex){
        if (typeof(req.body.changedIndex)==='string'){
            changedIndexArray.push(Number.parseInt(req.body.changedIndex))
        }
        else{
            for (let i=0; i<req.body.changedIndex.length; i++){
                changedIndexArray.push(Number.parseInt(req.body.changedIndex[i]))
            }
        }
    }
    const imagesArray=[]
    
    if (req.files){
        
        if (req.files.locationImage){
            req.body.locationImage=req.files.locationImage[0].location
        }
        if (!req.body.images){
            for (let i=0; i<req.files.imageFiles.length; i++){
                imagesArray.push(req.files.imageFiles[i].location)
                console.log('replacing other images')
            }
            req.body.images=imagesArray
        }
        else{
            let images=[]
            let length;
            //A single image is unchanged, form data passed as string.
            if (typeof(req.body.images)==='string'){
                images.push(req.body.images)
            }
            else{
                for (let i=0; i<req.body.images.length; i++){
                    images.push(req.body.images[i])  
                } 
            }
            if (req.files.imageFiles){
                length=req.files.imageFiles.length+images.length;
            }
            else{
                length=images.length
            }
            for (let i=0; i<length; i++){
                if (changedIndexArray.includes(i)){
                    console.log('replacing image')
                    imagesArray.push(req.files.imageFiles.shift().location)
                }
                else if (images){
                    imagesArray.push(images.shift())
                    console.log('old image preserved')
                }
                else break
            }
            req.body.images=imagesArray
        }
    }
    if (!req.body.name){
        res.status(400).json({message: 'could not update'})
    }
    db.Shrine.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedShrine)=>{
        if (!updatedShrine){
            res.status(400).json({message: "Could not update"})
        }
        else{
            console.log(updatedShrine)
            console.log('shrine updated')
            res.status(200).json({data: updatedShrine, message: "updated shrine"})
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