const express = require('express')
const routes = require('./routes')

const app = express()
app.disable('x-powered-by')
app.use(routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.info(`Server is listening on http://localhost:${PORT}`)
})
