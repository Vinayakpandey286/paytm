const express = require('express')
const { resgisterUser } = require('../controllers/userController')

const router = express.Router()

router.route('/signup').post(resgisterUser)
router.route('/signin').post(resgisterUser)


module.exports = router 