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

    
        if (req.files.length>0){
            for (let i=0; i<req.files.length;i++){
                if (i===0){
                    req.body.locationImage=req.files[0].location
                }
                else{
                    fileArray[i-1]=req.files[i].location
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
    // console.log(req.body)
    console.log(req.files)
    console.log(req.body.images)
   
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
    let changedArray=[]
    if (req.files){
        if (changedIndexArray.length>0){
            if (req.files[0].fieldname==='locationImage'){
                console.log("...changing")
                changedArray=[...changedIndexArray.map(index=>index+1)]
            }
            else changedArray=[...changedIndexArray]
            
        }
        console.log(changedArray)
        if (!req.body.images){
            console.log('not here')
            for (let i=0; i<req.files.length; i++){
                console.log(req.files[i].fieldname)
                if (req.files[i].fieldname==='locationImage'){
                    req.body.locationImage=req.files[i].location
                }
                else {
                    imagesArray.push(req.files[i].location)
                }
            }
            console.log(imagesArray)
            req.body.images=imagesArray
        }
        else{
            let length
            let images=[]
            console.log('here')
            if (typeof(req.body.images)==='string'){
                length=1+req.files.length
                images.push(req.body.images)
            }
            else{
                length=req.files.length+req.body.images.length
                for (let i=0; i<req.body.images.length; i++){
                    images.push(req.body.images[i])
                }
            }
            for (let i=0; i<length; i++){
                if (req.files.length>0 && req.files[0].fieldname==='locationImage'){
                    console.log("I'm really here")
                    req.body.locationImage=req.files.shift().location
                    console.log(req.files)
                }
                else if (changedArray.includes(i)){
                    console.log('replacing image')
                    imagesArray.push(req.files.shift().location)
                    console.log(req.files)
                }
                else if (images){
                    imagesArray.push(images.shift())
                    console.log('old image added')
                }
                else break
                console.log(imagesArray, i)
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