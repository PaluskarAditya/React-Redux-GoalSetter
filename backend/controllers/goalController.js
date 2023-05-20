const Goal = require("../models/goalModel")

const getAll = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id })
    if (!goals) {
      res.status(404).json({ err: "no goals found" })
    } else {
      res.status(200).json({ goals })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const addGoal = async (req, res) => {
  try {
    const { text } = req.body
    if (!text) {
      res.status(404).json({ err: "invalid goal data" })
    }
    const goal = await Goal.create({
      text,
      user: req.user.id
    })
    goal.save()
    if (goal) {
      res.status(200).json({ goal })
    } else {
      res.status(500).json({ err: "internal server error" })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const remGoal = async (req, res) => {
  try {
    const { id } = req.body
    const del = await Goal.findByIdAndDelete(id)
    if (del) {
      res.status(200).json({ deleted: del })
    } else {
      res.status(500).json({ err: "internal server error" })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const updGoal = async (req, res) => {
  try {
    const {id, text} = req.body
    // console.log(id, text.toString())
    const goal = await Goal.findByIdAndUpdate(id, {
      text: text.toString()
    })
    // console.log(goal)
    res.status(200).json({updated: goal})
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getAll,
  addGoal,
  remGoal,
  updGoal,
}