const router = require('express').Router();
const { creatureCtrls }= require('../controllers')
const upload= require('../services/fileUpload')

console.log(upload)

router.get('/')
router.get('/:id')
router.post('/', upload.single('image'), creatureCtrls.createCreature)
router.delete('/:id')
router.put('/:id')

module.exports = router;