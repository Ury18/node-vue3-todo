require("dotenv").config()
const package = require('../package.json')
const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const http = require("http")
const { TaskRouter } = require("./routes")

const { env: { PORT, DB_URL } } = process

const app = express()

mongoose.connect(DB_URL)
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

        http.createServer(app).listen(PORT, () => {
            console.log(`${package.name} ${package.version} running on port ${PORT}`)
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
