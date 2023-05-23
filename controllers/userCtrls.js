const db=require('../models')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

const register=(req, res)=>{
    req.body.password=bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    db.User.create(req.body).then((createdUser)=>{
        if (!createdUser){
            res.status(400).json({message: "Could not create"})
        }
        else{
            res.status(201).json({data: createdUser, message: "User created"})
        }
    })
}
const getProfile=(req, res)=>{
    db.User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup:
            {
                from: "creatures",
                localField: "_id",
                foreignField: "userId",
                as: "creatures"
            }
        }, {
            $lookup: {
                from: "monsters",
                localField: "_id",
                foreignField: "userId",
                as: "Monsters"
            }
        }, {
            $lookup: {
                from: "materials",
                localField: "_id",
                foreignField: "userId",
                as: "Materials"
            }
        }, {
            $lookup: {
                from: "equipment",
                localField: "_id",
                foreignField: "userId",
                as: "Equipment"
            }
        },
        {
            $project: { 
                username: 1,
                email: 1,
                creatures: 1,
                monsters: 1,
                equipment: 1,
                materials: 1
            }
        }
    ]).then((data)=>{
        if (!data){
            res.status(404).json({message: "not found"})
        }
        else res.status(200).json(data)
    })
}
const login=(req, res)=>{
    db.User.findOne({username: req.body.username}).then((foundUser)=>{
        if (!foundUser){
            res.status(404).json({message: "user not found"})
        }
        else{
            if (bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser=foundUser
                console.log(foundUser)
                res.status(200).json({username: foundUser.username})
            }
            else{
                res.staus(400).json({message: "username and password do not match"})
            }
        }
    })
}

const logout=(req, res)=>{
    req.session.destroy(()=>{
        res.send({message: `You have logged out`})
    })
}

module.exports={
    login,
    register,
    getProfile,
    logout
}