const router = require("express").Router()
const creatureRoutes=require("./creatureRoutes")

router.use('/creatures', creatureRoutes)

module.exports=router