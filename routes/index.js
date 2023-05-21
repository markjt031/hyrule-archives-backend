const router = require("express").Router()
const creatureRoutes=require("./creatureRoutes")
const monsterRoutes=require('./monsterRoutes')

router.use('/creatures', creatureRoutes)
router.use('/monsters', monsterRoutes)

module.exports=router