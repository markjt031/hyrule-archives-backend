/*
Monster:
No: Number
Name: String:
Recoverable Materials: [String]
Common Locations: [String]
Description: String
Image: String
*/
const mongoose=require('mongoose')

const MonsterSchema= new mongoose.Schema({
    no: {type: Number, unique: true},
    name: {type: String, unique: true, required: true},
    recoverableMaterials: [{type: String}],
    commonLocations: [{type: String}],
    description: {type: String},
    image: {type: String},
}, {timestamps: true})

const Monster= mongoose.model("Monster", MonsterSchema)
module.exports=Monster