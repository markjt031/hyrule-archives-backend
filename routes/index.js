const router = require("express").Router()
const creatureRoutes=require("./creatureRoutes")
const monsterRoutes=require('./monsterRoutes')
const materialRoutes=require('./materialRoutes')
const equipmentRoutes=require('./equipmentRoutes')
const userRoutes=require('./userRoutes')
const critterRoutes=require('./critterRoutes')
const searchRoutes=require('./searchRoutes')
const shrineRoutes=require('./shrineRoutes')
const korokRoutes=require('./korokRoutes')

router.use('/creatures', creatureRoutes)
router.use('/monsters', monsterRoutes)
router.use('/items/materials', materialRoutes)
router.use('/items/equipment', equipmentRoutes)
router.use('/critters', critterRoutes)
router.use('/users', userRoutes)
router.use('/search', searchRoutes)
router.use('/shrines', shrineRoutes)
router.use('/koroks', korokRoutes)


module.exports=router