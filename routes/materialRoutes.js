const router = require('express').Router();
const { materialCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')


router.get('/', materialCtrls.getAllMaterials)
router.get('/:id', materialCtrls.getOneMaterial)
router.post('/', upload.single('image'), materialCtrls.createMaterial)
router.delete('/:id', materialCtrls.deleteMaterial)
router.put('/:id', upload.single('image'), materialCtrls.updateMaterial)

module.exports = router;