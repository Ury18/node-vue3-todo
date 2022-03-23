const Task = require('./index')

logic = {
    async getTasks() {
        let tasks = await Task.find({}).select('-__v').lean()
        tasks.forEach(task => {
            task.id = task._id.toString()
            delete task._id
        })
        return tasks
    },

    async createTask(taskData) {
        let task = new Task(taskData)

        task = await task.save()
        task = await Task.findById(task._id).select('-__v').lean()
        task.id = task._id
        delete task._id
        return task

    },

    async updateTask(taskId, taskData) {

        let task = await Task.findById(taskId)
        var keys = Object.keys(taskData)

        keys.forEach(key => {
            task[key] = taskData[key]
        });

        task = await task.save()
        task = await Task.findById(taskId).select('-__v').lean()
        task.id = task._id
        delete task._id
        return task
    },

    async deleteTask(taskId) {
        let task = await Task.findById(taskId)
        return await task.remove()
    },

    async deleteMultipleTasks(taskIds) {
        let tasks = await Task.deleteMany({ _id: taskIds })
        return tasks
    }

}

module.exports = logic