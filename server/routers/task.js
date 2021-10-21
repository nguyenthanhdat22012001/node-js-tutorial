const express = require('express');
const taskModel = require('../models/Task');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const { json } = require('express');


// @route GET /api/task/
// @desc get all task
// @access Private

router.get('/',verifyToken, async (req, res) => {
  try {
    const Tasks = await taskModel.find();
    return res.json({Tasks});
  } catch (error) {
    console.log(error);
    return res
        .status(500)
        .json({success:false, message: "Internal server error"});
  }
})

// @route POST /api/task/
// @desc post task
// @access Private

router.post('/',verifyToken ,async (req, res) =>{
    const {title,description,status} = req.body;
     
    // validate
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: "Title is required" });
    
    try {
        const newTask = new taskModel({
            title:title,
            description:description,
            status: status || 'TO WORK',
            userId: req.body.userId
        });
        await newTask.save();

        return res.json({success: true, message: "Task is created, Successfully", task: newTask});
        
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({success:false, message: "Internal server error"});
    }
});

// @route PUT /api/task/:id
// @desc update task
// @access Private

router.put('/:id',verifyToken ,async (req, res) =>{
    const {title,description,status} = req.body;
     
    // validate
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: "Title is required" });
    
    try {
        let updatedTask ={
            title:title,
            description:description || '',
            status: status || 'TO WORK',
        }
        const conditionUpdateTask = {_id: req.params.id , userId: req.body.userId};

        updatedTask = await taskModel.findOneAndUpdate(conditionUpdateTask,updatedTask,{new:true});


        if(!updatedTask)
            return res
                .status(401)
                .json({ success: false, message: "Task not found or User is not Authorize" });


        return res.json({success: true, message: "Task is updated, Successfully", task: updatedTask});
        
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({success:false, message: "Internal server error"});
    }
});

// @route DELETE /api/task/:id
// @desc delete task
// @access Private

router.delete('/:id', verifyToken, async (req,res) => {
    try {
        const conditionDeleteTask = {_id: req.params.id , userId: req.body.userId};

       let deleteTask = await taskModel.findOneAndDelete(conditionDeleteTask);

       if(!deleteTask)
            return res
                .status(401)
                .json({ success: false, message: "Task not found or User is not Authorize" });

        
        return res.json({success: true, message: `Task ${deleteTask.title} is deleted, Successfully`});

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({success:false, message: "Internal server error"});
    }
})

module.exports = router;