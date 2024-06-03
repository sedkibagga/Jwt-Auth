const express = require('express');
const router = express.Router();
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController');
const protect = require('../middleware/authMiddleware');
console.log('getGoals:', getGoals);
console.log('setGoal:', setGoal);
console.log('updateGoal:', updateGoal);
console.log('deleteGoal:', deleteGoal);
console.log('protect:', protect);

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


module.exports = router;


