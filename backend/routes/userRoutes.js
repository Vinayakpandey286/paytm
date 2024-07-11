const express = require('express')
const { resgisterUser, updateUser, findUser, authUser } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/signup').post(resgisterUser)
router.route('/signin').post(authUser)
router.route('/').put(authMiddleware,updateUser)
router.route('/bulk').get(findUser)


module.exports = router 