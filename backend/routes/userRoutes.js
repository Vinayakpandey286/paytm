const express = require('express')
const { resgisterUser, loggingUser } = require('../controllers/userController')

const router = express.Router()

router.route('/signup').post(resgisterUser)
router.route('/signin').post(loggingUser)


module.exports = router 