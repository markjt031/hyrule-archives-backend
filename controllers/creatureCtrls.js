const db=require('../models')


const createCreature=(req, res)=>{
    req.body.image=req.file.location;
    db.Creature.create(req.body).then((result=>{
        console.log(result)
        res.status(201).json(result)
    }))
}

module.exports={
    createCreature
}