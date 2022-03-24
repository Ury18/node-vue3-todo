require("dotenv").config()
const Task = require('./index')
const logic = require("./logic.js")
const expect = require("expect")
const { default: mongoose } = require("mongoose")

const { env: { TEST_DB_URL } } = process


describe("Task Logic", () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() => {
        Promise.all([
            Task.deleteMany()
        ])
    })

    describe("Create Task", () => {
        const taskData = {
            title: "test",
            status: "active"
        }

        it("Should succeed on valid data", async() => {
            const task = await logic.createTask(taskData)
            expect(task.id).toBeDefined()
        })

        it("Should succeed on valid title and no status", async() => {
            const newTaskData = {
                title: "test"
            }
            const task = await logic.createTask(newTaskData)
            expect(task.id).toBeDefined()
            expect(task.status).toBe("active")
        })

        it("Should succeed on valid title and completed status", async() => {
            const newTaskData = taskData
            newTaskData.status = "completed"
            const task = await logic.createTask(newTaskData)
            expect(task.id).toBeDefined()
            expect(task.status).toBe("completed")
        })

        it("Should fail on empty title", async() => {
            const newTaskData = taskData
            newTaskData.title = ""
            let error = null

            await logic.createTask(newTaskData)
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on invalid status value", async() => {
            const newTaskData = taskData
            newTaskData.status = "test"
            let error = null

            await logic.createTask(newTaskData)
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on invalid status data type", async() => {
            const newTaskData = taskData
            newTaskData.status = 3
            let error = null

            await logic.createTask(newTaskData)
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on invalid title data type", async() => {
            const newTaskData = taskData
            newTaskData.title = 3
            let error = null

            await logic.createTask(newTaskData)
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

    })

    describe("Get Tasks", () => {
        it("Should succeed on getting empty Tasks list ", async() => {
            const tasks = await logic.getTasks()
            expect(tasks).toBeDefined()
            expect(typeof tasks).toBe("object")
            expect(tasks.length).toBeDefined()
            expect(tasks.length).toBe(0)
        })

        it("Should succeed on getting Tasks ", async() => {
            const task = await logic.createTask({ title: "test" })
            const tasks = await logic.getTasks()
            expect(tasks).toBeDefined()
            expect(typeof tasks).toBe("object")
            expect(tasks.length).toBeDefined()
            expect(tasks.length).toBe(1)
            expect(typeof tasks[0].id).toBe("string")
            expect(typeof tasks[0]._id).toBe("undefined")

        })
    })


    describe("Update Tasks", () => {
        let taskId = ""

        beforeEach(async() => {
            let testTask = await logic.createTask({ "title": "Test Task" })
            taskId = testTask.id.toString()
        })


        it("Should succeed on updating Task title with correct data type", async() => {
            const task = await logic.updateTask(taskId, { title: "new title" })
            expect(task).toBeDefined()
            expect(task.title).toBe("new title")
        })

        it("Should succeed on updating Task status with correct data type and value", async() => {
            const task = await logic.updateTask(taskId, { status: "completed" })
            expect(task).toBeDefined()
            expect(task.status).toBe("completed")
        })

        it("Should fail on updating Task title with empty string ", async() => {
            let error = null

            await logic.updateTask(taskId, { title: "" })
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on updating Task title with wrong data type ", async() => {
            let error = null

            await logic.updateTask(taskId, { title: ["asds"] })
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on updating Task status with wrong value ", async() => {
            let error = null

            await logic.updateTask(taskId, { status: "wrong" })
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on updating Task status with wrong data type ", async() => {
            let error = null

            await logic.updateTask(taskId, { status: 3 })
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })
    })

    describe("Delete Task", () => {
        let taskId = ""

        beforeEach(async() => {
            let testTask = await logic.createTask({ "title": "Test Task" })
            taskId = testTask.id.toString()
        })


        it("Should succeed on deleting existing Task ", async() => {
            const task = await logic.deleteTask(taskId)
            const deletedTask = await Task.findById(taskId)
            expect(deletedTask).toBe(null)
        })

        it("Should fail on deleting non existing Task", async() => {
            let error = null


            await logic.deleteTask("taskId")
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on deleting TaskId string being empty", async() => {
            let error = null

            await logic.updateTask("")
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on deleting Task when taskId is wrong data type ", async() => {
            let error = null

            await logic.updateTask(3)
                .catch((e) => {
                    error = e
                })
            expect(error).not.toBeNull()
        })

    })

    describe("Delete Multiple Tasks", () => {
        let taskIds = []

        beforeEach(async() => {
            taskIds = []

            let testTask1 = await logic.createTask({ "title": "Test Task" })
            taskIds.push(testTask1.id.toString())
            let testTask2 = await logic.createTask({ "title": "Test Task" })
            taskIds.push(testTask2.id.toString())
        })


        it("Should succeed on deleting existing Tasks ", async() => {
            const tasks = await logic.deleteMultipleTasks(taskIds)
            const deletedTask1 = await Task.findById(taskIds[0])
            const deletedTask2 = await Task.findById(taskIds[1])

            expect(deletedTask1).toBe(null)
            expect(deletedTask2).toBe(null)
        })

        it("Should fail on delete tasks that exist if one of the ids provided is fake", async() => {
            let error = null

            await logic.deleteMultipleTasks([taskIds[0], "test"])
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()

            const deletedTask = await Task.findById(taskIds[0])
            expect(deletedTask._id.toString()).toBe(taskIds[0])

        })

        it("Should fail on delete tasks if all of the ids provided are fake", async() => {
            let error = null

            await logic.deleteMultipleTasks(["test2", "test"])
                .catch((e) => {
                    error = e
                })

            expect(error).not.toBeNull()
        })

        it("Should fail on deleting Tasks when taskIds is wrong data type ", async() => {
            let error = null

            await logic.deleteMultipleTasks([3, {}])
                .catch((e) => {
                    error = e
                })
            expect(error).not.toBeNull()
        })

    })

    after(() => {
        Promise.all([
            Task.deleteMany()
        ]).then(() => mongoose.disconnect())
    })

})
