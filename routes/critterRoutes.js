const router = require('express').Router();
const { critterCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')


router.get('/', critterCtrls.getAllCritters)
router.get('/:id', critterCtrls.getOneCritter)
router.post('/', upload.single('image'), critterCtrls.createCritter)
router.delete('/:id', isAuthenticated, critterCtrls.deleteCritter)
router.put('/:id', isAuthenticated, upload.single('image'), critterCtrls.updateCritter)

module.exports = router;