const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");

//!add task
router.post("/addtask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existinguser = await User.findById(id);
    if (existinguser) {
      const list = new List({ title, body, user: existinguser });
      await list.save().then(() => res.status(200).json({ list }));
      existinguser.list.push(list);
      existinguser.save();
    }
  } catch (error) {
    console.log(error);
  }
});







//!update
router.put("/updatetask/:id", async (req, res) => {
  const { id } = req.params;
  const {title,body}=req.body;
  try {
      await List.findOneAndUpdate({ _id: id }, {title,body }, { new: true })
        .then(() => res.status(200).json({ message: "task updated" }));
  
  } catch (error) {
    res.status(200).json({ message: "no task found" });
  }
});
//!delete
router.delete("/deletetask/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const existingUser = await User.findOneAndUpdate(
      { list: taskId }, // Find the user who has the task in their list
      { $pull: { list: taskId } }// Remove the task ID from the user's list
      // { new: true } // Optionally return the updated user document
    );
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found or task not in user's list" });
    }
    // Delete the task from the List collection
    await List.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

//!edit task
router.get("/edittask/:id", async (req, res) => {
  try {
    const task = await List.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found with ID: " + req.params.id });
    }
    // Assuming 'title' and 'body' are properties of the retrieved 'task' object
    res.status(200).json({ title: task.title, body: task.body });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(200).json({ message: "Internal server error" });
  }
});

//!get task
router.get("/gettask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ list: list });
  } catch (error) {
    res.status(200).json({ message: "no task found" });
  }
});

module.exports = router;
