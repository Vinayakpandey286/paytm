const express = require('express')
const { resgisterUser, loggingUser, updateUser } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/signup').post(resgisterUser)
router.route('/signin').post(loggingUser)
router.route('/').put(authMiddleware,updateUser)
router.route('/bulk').get(authMiddleware,updateUser)


module.exports = router 