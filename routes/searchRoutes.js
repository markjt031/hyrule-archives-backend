const router = require('express').Router();
const { searchCtrls }= require('../controllers')

router.get('/:name', searchCtrls.search)

module.exports=router