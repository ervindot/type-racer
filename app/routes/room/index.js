const {Router} = require('express')
const debug = require('debug')('typeracer:endpoint')

const router = Router()

router.get('/:roomname/user/:username', (request, response) => {
  debug(`GET request to /room/:roomname/user/:username`)
  const {roomname, username} = request.params
  debug(`Room route with room "${roomname}" and user "${username}"`)
  response.render('index', {roomname, username})
})

router.get('/:roomname/status', (request, response) => {
  debug(`GET request to /room/:roomname/status`)
  const {roomname} = request.params
  debug(`Room status route with room "${roomname}"`)
  response.send({roomname})
})

module.exports = router
