const express = require("express")
const port = 3080
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const package = require('../package.json')
const http = require("http")
const { TaskRouter } = require("./routes")


const app = express()

mongoose.connect("mongodb://localhost:27017/affluence-todo")
    .then(() => {
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        })
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use('/api/tasks', TaskRouter)

        http.createServer(app).listen(port, () => {
            console.log(`${package.name} ${package.version} running on port ${port}`)
        })
    })
    .catch(console.error)


process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log(`\n ${package.name} stopped`)

            process.exit(0)
        })
})