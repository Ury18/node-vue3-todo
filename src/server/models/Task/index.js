const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const Task = new Schema({

    title: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ["active", "completed"],
        default: "pending"
    },

})

module.exports = mongoose.model("Task", Task)