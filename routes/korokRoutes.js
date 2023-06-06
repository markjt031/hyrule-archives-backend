const router = require('express').Router();
const { korokCtrls }= require('../controllers')
const upload= require('../services/fileUpload')
const isAuthenticated=require('../middleware/isAuthenticated')


router.get('/', korokCtrls.getAllKoroks)
router.get('/search', korokCtrls.filterByRegion)
router.get('/:id', korokCtrls.getOneKorok)

router.post('/', upload.any('images'), korokCtrls.createKorok)
router.delete('/:id', korokCtrls.deleteKorok)
router.put('/:id', upload.any('images'), korokCtrls.updateKorok)
    

module.exports = router;