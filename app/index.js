const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express')
const debug = require('debug')('typeracer:websocket')
const handlebars = require('express-handlebars')
const routes = require('./routes')

const staticFolder = path.resolve(__dirname, './public/build')
const viewsFolder = path.resolve(__dirname, './views')

const app = express()
app.disable('x-powered-by')
app.use(express.static(staticFolder))
app.use(routes)
app.set('views', viewsFolder)
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars())

const server = http.Server(app)
const websocket = socketIO(server)

websocket.on('connection', socket => {
  debug('An user connected')
  socket.on('disconnect', () => {
    debug('User disconnected')
  })
  socket.on('join', message => {
    debug(`User "${message.user}" wants to join room "${message.room}"`)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.info(`Server is listening on http://localhost:${PORT}`)
})
