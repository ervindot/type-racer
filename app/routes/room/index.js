const {Router} = require('express')

const router = Router()

router.get('/:roomname/user/:username', (request, response) => {
  response.send('Hello World from /room/:roomname/user/:username')
})

router.get('/:roomname/status', (request, response) => {
  response.send('Hello World from /room/:roomname/status')
})

module.exports = router
