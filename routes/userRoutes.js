const router = require('express').Router();
const { userCtrls }= require('../controllers')



router.post('/register', userCtrls.register)
router.post('/login', userCtrls.login)
router.get('/logout', userCtrls.logout)
router.get('/profile/:id', userCtrls.getProfile)

module.exports = router;