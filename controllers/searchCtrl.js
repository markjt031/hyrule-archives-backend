const db=require('../models')
const mongoose=require('mongoose')

const search=(req,res)=>{
    const name=req.query.name
    Promise.all([
        db.Creature.find({'name': {$regex: name, $options: "i"}}).sort({no: 1}),
        db.Critter.find({'name': {$regex: name, $options: "i"}}).sort({no: 1}),
        db.Monster.find({'name': {$regex: name, $options: "i"}}).sort({no: 1}),
        db.Material.find({'name': {$regex: name, $options: "i"}}).sort({no: 1}),
        db.Equipment.find({'name': {$regex: name, $options: "i"}}).sort({no: 1})
    ]).then((results)=>{
        if (!results){
            res.status(404).json({message: "Not found"})
        }
        else{
            const data=[]
            for (let i=0; i<results.length;i++){
                if (results[i].length>=1){
                    data.push(...results[i])
                }
            }
            res.status(200).json({data})
        }
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    })
}
module.exports={search};