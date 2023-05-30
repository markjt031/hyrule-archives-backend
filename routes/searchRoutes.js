const router = require('express').Router();
const { searchCtrls }= require('../controllers')

router.get('/', searchCtrls.search)

module.exports=router