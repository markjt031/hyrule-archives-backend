const router = require('express').Router();
const { userCtrls }= require('../controllers')



router.post('/', userCtrls.register)
router.post('/login', userCtrls.login)
router.get('/logout', userCtrls.logout)


module.exports = router;