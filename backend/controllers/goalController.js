const Goal = require('../models/goalModel');
const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler( async (req , res) => { 
const goals = await Goal.find({user: req.user.id});
res.status(200).json(goals);
}) ; 

const setGoal = asyncHandler(async (req, res) => {
    let goal;
    const { text } = req.body;
    if (!text) {
        throw new Error('Please add a text field');
    } else if (!req.user) {
        throw new Error('User not found');
    } else {
        goal = await Goal.findOne({ user: req.user.id }); 
        if (goal) {
            throw new Error('Goal already exists');
        } else {
            goal = await Goal.create({
                text: text,
                user: req.user.id
            });
        }
    }
    res.status(200).json(goal);
});
const updateGoal = asyncHandler( async (req , res) => {
     const goal = await Goal.findById(req.params.id) ; 
     if (!goal) {
        throw new Error('Goal not found');
     } 
     if (!req.user){
        throw new Error('User not found');
     }
     if(goal.user.toString() !== req.user.id) {
        throw new Error('User not authorized');
     } else {
       const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body , {new: true});
       res.status(200).json(updatedGoal);
     }

});

const deleteGoal = asyncHandler(async (req , res ) => {
    const goal = await Goal.findById(req.params.id) ; 
    if (!goal) {
        throw new Error('Goal not found');
    } if (!req.user) {
    throw new Error('User not found');
    }
    if(goal.user.toString() !== req.user.id) {
        throw new Error('User not authorized');
    } else {
        await goal.remove();
        res.status(200).json({id: req.params.id});
    }
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}

