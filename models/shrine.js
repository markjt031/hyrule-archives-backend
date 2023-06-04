const mongoose=require('mongoose')

const ShrineSchema= new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    subtitle: {type: String},
    region: {type: String},
    locationImage: {type: String},
    coordinates: {type:String},
    bodyText: [{type: String}],
    images: [{type: String}],
    userId: {type: mongoose.Types.ObjectId},
    userName: {type: String}
}, {timestamps: true})

const Shrine= mongoose.model("Shrine", ShrineSchema)
module.exports=Shrine