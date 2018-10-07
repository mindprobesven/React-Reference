var path = require('path')
var express = require('express')
var port = 3002
var app = express()

app.use(express.static(path.resolve(__dirname, '../../dist')))

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "../../dist/index.html")))

app.listen(port)
console.log('The server is running!')
console.log('Open http://localhost:' + port + ' in your browser')