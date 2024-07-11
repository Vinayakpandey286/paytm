const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getBalance, transferBalance } = require('../controllers/userController');

const router = express.Router()

router.route('/balance').get(authMiddleware, getBalance)
router.route('/transfer').get(authMiddleware, transferBalance)




module.express = router