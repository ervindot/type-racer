const {Router} = require('express')
const debug = require('debug')('typeracer:endpoints')

const router = Router()

router.get('/:roomname/user/:username', (request, response) => {
  const {roomname, username} = request.params
  debug(`Main room route with room "${roomname}" and user "${username}"`)
  response.render('index', {roomname, username})
})

router.get('/:roomname/status', (request, response) => {
  const {roomname} = request.params
  debug(`Room status route with room "${roomname}"`)
  response.send({roomname})
})

module.exports = router
