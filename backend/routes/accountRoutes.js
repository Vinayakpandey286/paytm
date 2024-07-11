const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getBalance, transferBalance } = require('../controllers/userController');

const router = express.Router()

router.route('/balance').get(authMiddleware, getBalance)
router.route('/transfer').post(authMiddleware, transferBalance)




module.exports = router