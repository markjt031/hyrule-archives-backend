//Added a critters category for creatures that double as items and have a different schema than the other creatures

const mongoose=require('mongoose')

const CritterSchema= new mongoose.Schema({
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

const Critter= mongoose.model("Critter", CritterSchema)
module.exports=Critter