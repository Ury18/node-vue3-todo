const Task = require('./index')

logic = {
    getTasks() {
        return Task.find({}).select('-__v').lean()
            .then(tasks => {
                tasks.forEach(task => {
                    task.id = task._id.toString()
                    delete task._id
                })
                return tasks
            })
    },

    createTask(taskData) {
        let task = new Task(taskData)

        return task.save()
            .then(task => {
                return Task.findById(task._id).select('-__v').lean()
                    .then(task => {
                        task.id = task._id
                        delete task._id
                        return task
                    })
            })

    },

    updateTask(taskId, taskData) {

        return Task.findById(taskId)
            .then(task => {
                var keys = Object.keys(taskData)

                keys.forEach(key => {
                    task[key] = taskData[key]
                });

                return task.save()
                    .then(task => {
                        return Task.findById(taskId).select('-__v').lean()
                            .then(task => {
                                task.id = task._id
                                delete task._id
                                return task
                            })
                    })
            })
    },

    deleteTask(taskId) {
        return Task.findById(taskId)
            .then(task => {
                return task.remove()
            })
    }

}

module.exports = logic