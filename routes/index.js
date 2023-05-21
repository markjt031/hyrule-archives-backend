const router = require("express").Router()
const creatureRoutes=require("./creatureRoutes")
const monsterRoutes=require('./monsterRoutes')
const materialRoutes=require('./materialRoutes')

router.use('/creatures', creatureRoutes)
router.use('/monsters', monsterRoutes)
router.use('/items/materials', materialRoutes)

module.exports=router