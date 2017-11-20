const path = require('path')
const http = require('http')
const express = require('express')
const handlebars = require('express-handlebars')

const routes = require('./routes')
const {startWebSocket} = require('./handlers/Socket')

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
startWebSocket(server)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.info(`Server is listening on http://localhost:${PORT}`)
})
