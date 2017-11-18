const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')

const staticFolder = path.resolve(__dirname, './public/build')
const viewsFolder = path.resolve(__dirname, './views')

const app = express()
app.disable('x-powered-by')
app.use(express.static(staticFolder))
app.use(routes)
app.set('views', viewsFolder)
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.info(`Server is listening on http://localhost:${PORT}`)
})
