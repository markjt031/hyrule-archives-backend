const mongoose=require('mongoose')

const CreatureSchema= new mongoose.Schema({
    no: {type: Number, unique: true},
    name: {type: String, unique: true, required: true},
    recoverableMaterials: [{type: String}],
    commonLocations: [{type: String}],
    description: {type: String},
    image: {type: String},
    userId: {type: mongoose.Types.ObjectId}
}, {timestamps: true})

const Creature= mongoose.model("Creature", CreatureSchema)
module.exports=Creature