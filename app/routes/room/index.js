const {Router} = require('express')

const router = Router()

router.get('/:roomname/user/:username', (request, response) => {
  const {roomname, username} = request.params
  response.render('index', {roomname, username})
})

router.get('/:roomname/status', (request, response) => {
  const {roomname} = request.params
  response.send({roomname})
})

module.exports = router
