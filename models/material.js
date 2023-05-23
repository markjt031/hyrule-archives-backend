/*
Materials:
No: Number
Name: String
Fuse Attack Power: Number
Hearts Recovered: Number
Unique Cooking Effects: [String}
Common Locations: [String]
Image: String
*/
const mongoose=require('mongoose')

const MaterialSchema= new mongoose.Schema({
    no: {type: Number, unique: true},
    name: {type: String, unique: true, required: true},
    fuseAttackPower: {type: Number},
    heartsRecovered: {type: Number},
    uniqueCookingEffects: [{type: String}],
    commonLocations: [{type: String}],
    description: {type: String},
    image: {type: String},
    userId: {type: mongoose.Types.ObjectId}
}, {timestamps: true})

const Material= mongoose.model("Material", MaterialSchema)
module.exports=Material