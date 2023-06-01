const router = require('express').Router();
const { monsterCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')


router.get('/', monsterCtrls.getAllMonsters)
router.get('/:id', monsterCtrls.getOneMonster)
router.post('/', upload.single('image'), monsterCtrls.createMonster)
router.delete('/:id', isAuthenticated, monsterCtrls.deleteMonster)
router.put('/:id', isAuthenticated, upload.single('image'), monsterCtrls.updateMonster)

module.exports = router;