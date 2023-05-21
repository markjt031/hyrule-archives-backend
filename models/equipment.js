/*
No: Number
Name: String
Properties: {attack: Number, defense: Number, otherProperties: [String] }
Common Locations: [String]
Description: String
Image: String
*/
const mongoose=require('mongoose')

const EquipmentSchema= new mongoose.Schema({
    no: {type: Number, unique: true},
    name: {type: String, unique: true, required: true},
    properties: {attack: {type: Number}, defense: {type: Number}, otherProperties:[{type: String}]},
    commonLocations: [{type: String}],
    description: {type: String},
    image: {type: String},
}, {timestamps: true})

const Equipment= mongoose.model("Equipment", EquipmentSchema)
module.exports=Equipment