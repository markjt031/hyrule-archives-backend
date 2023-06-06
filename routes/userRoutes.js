const router = require('express').Router();
const { userCtrls }= require('../controllers')
const upload=require('../services/fileUpload')



router.post('/register', userCtrls.register)
router.post('/login', userCtrls.login)
router.get('/logout', userCtrls.logout)
router.get('/profile/:id', userCtrls.getProfile)
router.get('/', userCtrls.getUsers)
router.put('/profile/:id', upload.single('avatar'), userCtrls.uploadAvatar)

module.exports = router;