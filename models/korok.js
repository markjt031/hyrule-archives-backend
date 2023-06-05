const mongoose=require('mongoose')

const KorokSchema= new mongoose.Schema({
    region: {type: String},
    locationDescription: {type: String},
    locationImage: {type: String},
    korokImage: {type: String},
    korokDescription: {type:String},
    userId: {type: mongoose.Types.ObjectId},
    userName: {type: String}
}, {timestamps: true})

const Korok= mongoose.model("Korok", KorokSchema)
module.exports=Korok