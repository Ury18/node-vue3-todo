const express = require("express")
const logic = require('../models/Task/logic')

const taskRouter = express.Router()

taskRouter.route("/")
    .get((req, res) => {

        try {
            logic.getTasks()
                .then((tasks) => {
                    res.status(201).json(tasks)
                })
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }

    })
    .post((req, res) => {

        try {
            logic.createTask(req.body)
                .then((task) => {
                    res.status(200).json(task)
                })
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }

    })

taskRouter.route("/:taskId")
    .put((req, res) => {

        try {
            logic.updateTask(req.params.taskId, req.body)
                .then((task) => {
                    res.status(200).json(task)
                })
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }

    })
    .delete((req, res) => {
        try {
            logic.deleteTask(req.params.taskId)
                .then((task) => {
                    res.status(200).send()
                })
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

module.exports = taskRouter