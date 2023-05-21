const router = require('express').Router();
const { creatureCtrls }= require('../controllers')
const upload= require('../services/fileUpload')


router.get('/', creatureCtrls.getAllCreatures)
router.get('/:id', creatureCtrls.getOneCreature)
router.post('/', upload.single('image'), creatureCtrls.createCreature)
router.delete('/:id', creatureCtrls.deleteCreature)
router.put('/:id', upload.single('image'), creatureCtrls.updateCreature)

module.exports = router;