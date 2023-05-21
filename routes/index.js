const router = require("express").Router()
const creatureRoutes=require("./creatureRoutes")
const monsterRoutes=require('./monsterRoutes')
const materialRoutes=require('./materialRoutes')
const equipmentRoutes=require('./equipmentRoutes')

router.use('/creatures', creatureRoutes)
router.use('/monsters', monsterRoutes)
router.use('/items/materials', materialRoutes)
router.use('/items/equipment', equipmentRoutes)


module.exports=router