const router = require('express').Router();
const { monsterCtrls }= require('../controllers')
const upload= require('../services/fileUpload')


router.get('/', monsterCtrls.getAllMonsters)
router.get('/:id', monsterCtrls.getOneMonster)
router.post('/', upload.single('image'), monsterCtrls.createMonster)
router.delete('/:id', monsterCtrls.deleteMonster)
router.put('/:id', upload.single('image'), monsterCtrls.updateMonster)

module.exports = router;