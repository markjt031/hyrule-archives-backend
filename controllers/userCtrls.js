const db=require('../models')

const bcrypt = require('bcrypt')
const User = require('../models/user.js')

const register=(req, res)=>{
    req.body.password=bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body).then((createdUser)=>{
        if (!createdUser){
            res.status(400).json({message: "Could not create"})
        }
        else{
            res.status(201).json({data: createdUser, message: "User created"})
        }
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
    logout
}