const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    username: { type: String, unique: true, required:true},
    email: { type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: {type: String}
})

const User= mongoose.model('User', UserSchema)
module.exports=User