const router = require('express').Router();
const { shrineCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')


router.get('/', shrineCtrls.getAllShrines)
router.get('/:id', shrineCtrls.getOneShrine)
router.post('/', upload.any('images'), shrineCtrls.createShrine)
router.delete('/:id', shrineCtrls.deleteShrine)
router.put('/:id', upload.any('images'), shrineCtrls.updateShrine)
    

module.exports = router;