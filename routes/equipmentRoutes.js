const router = require('express').Router();
const { equipmentCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')

router.get('/', equipmentCtrls.getAllEquipment)
router.get('/:id', equipmentCtrls.getOneEquipment)
router.post('/', isAuthenticated, upload.single('image'), equipmentCtrls.createEquipment)
router.delete('/:id', isAuthenticated, equipmentCtrls.deleteEquipment)
router.put('/:id', isAuthenticated, upload.single('image'), equipmentCtrls.updateEquipment)

module.exports = router;