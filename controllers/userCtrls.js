const db=require('../models')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const jwt=require('jsonwebtoken')

const register=(req, res)=>{
    req.body.password=bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body).then((createdUser)=>{
        if (!createdUser){
            res.status(400).json({message: "Could not create"})
        }
        else{
            res.status(201).json({data: createdUser, message: "User created"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: "User already exists"})
    })

    
}
const getUsers=(req,res)=>{
    User.find({}, {username:1, _id:1}).sort({no: 1}).then((foundUsers)=>{
        if (!foundUsers){
            res.status(404).json({message: 'Users not found'})
        }
        else{
            res.status(200).json({data: foundUsers})
        }
    })
    
}
const getProfile=(req, res)=>{
    User.aggregate([
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
                as: "monsters"
            }
        }, {
            $lookup: {
                from: "materials",
                localField: "_id",
                foreignField: "userId",
                as: "materials"
            }
        }, {
            $lookup: {
                from: "equipment",
                localField: "_id",
                foreignField: "userId",
                as: "equipment"
            }
        },
        {
            $lookup: {
                from: "critters",
                localField: "_id",
                foreignField: "userId",
                as: "critters"
            }
        },
        {
            $lookup: {
                from: "shrines",
                localField: "_id",
                foreignField: "userId",
                as: "shrines"
            }
        },
        {
            $lookup: {
                from: "koroks",
                localField: "_id",
                foreignField: "userId",
                as: "koroks"
            }
        },
        {
            $project: { 
                username: 1,
                email: 1,
                creatures: 1,
                critters: 1,
                monsters: 1,
                equipment: 1,
                materials: 1,
                shrines: 1,
                koroks: 1
                
            }
        }
    ]).then((data)=>{
        if (!data){
            res.status(404).json({message: "not found"})
        }
        else res.status(200).json(...data)
    })
}
const login=(req, res)=>{
    User.findOne({username: req.body.username}).then((foundUser)=>{
        if (!foundUser){
            res.status(404).json({message: "user not found"})
        }
        else{
            if (bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser=foundUser
                res.status(200).json({username: foundUser.username, id: foundUser.id, email: foundUser.email})
            }
            else{
                res.status(400).json({message: "username and password do not match"})
            }
        }
    })
}

const logout=(req, res)=>{
    req.session.destroy(()=>{
        res.send({message: `You have logged out`})
    })
}
const uploadAvatar=(req, res)=>{
    if (req.file){
    User.findOneAndUpdate({_id: req.params.id},{$set: {'avatar': req.file.location}}, {new:true}).then((updatedUser)=>{
        if (!updatedUser){
            res.status(400).json({message: 'could not update avatar'})
        }
        else{
            res.status(200).json({data: updatedUser, message: 'avatar updated successfully'})
        }
    })
    }
}
module.exports={
    login,
    register,
    getProfile,
    getUsers,
    logout,
    uploadAvatar
}