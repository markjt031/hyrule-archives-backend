const router = require('express').Router();
const { creatureCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')


router.get('/', creatureCtrls.getAllCreatures)
router.get('/:id', creatureCtrls.getOneCreature)
router.post('/', isAuthenticated, upload.single('image'), creatureCtrls.createCreature)
router.delete('/:id', isAuthenticated, creatureCtrls.deleteCreature)
router.put('/:id', isAuthenticated, upload.single('image'), creatureCtrls.updateCreature)

module.exports = router;