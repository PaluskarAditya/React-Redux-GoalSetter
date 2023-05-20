const express = require('express');
const auth = require('../middlewares/authMiddleware');
const { addGoal, getAll, remGoal, updGoal } = require('../controllers/goalController');
const router = express.Router();

router.get('/all', auth, getAll)
router.post('/add', auth, addGoal)
router.delete('/remove', auth, remGoal)
router.patch('/update', auth, updGoal)

module.exports = router;