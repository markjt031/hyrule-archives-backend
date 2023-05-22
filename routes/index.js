const router = require("express").Router()
const creatureRoutes=require("./creatureRoutes")
const monsterRoutes=require('./monsterRoutes')
const materialRoutes=require('./materialRoutes')
const equipmentRoutes=require('./equipmentRoutes')
const userRoutes=require('./userRoutes')

router.use('/creatures', creatureRoutes)
router.use('/monsters', monsterRoutes)
router.use('/items/materials', materialRoutes)
router.use('/items/equipment', equipmentRoutes)
router.use('/users', userRoutes)


module.exports=router