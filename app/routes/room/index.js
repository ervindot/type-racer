const {Router} = require('express')
const debug = require('debug')('typeracer:endpoint')
const {currentRooms} = require('../../handlers/Room')

const router = Router()

router.get('/:roomname/user/:username', (request, response) => {
  const {roomname, username} = request.params

  debug(`GET request to /room/:roomname/user/:username`)
  debug(`Room route with room "${roomname}" and user "${username}"`)

  response.render('index', {roomname, username})
})

router.get('/:roomname/status', (request, response) => {
  const {roomname} = request.params

  debug(`GET request to /room/:roomname/status`)
  debug(`Room status route with room "${roomname}"`)

  const room = currentRooms[roomname]
  if (!room) {
    response.status(404).send({message: 'Room does not exist'})
    return
  }

  response.send({
    'active_users': room.activeUsers,
    'keystrokes': room.keystrokes,
    'active_since': room.activeSince,
    'counter': room.counter,
    'below_mean': 0,
    'ranking': room.ranking,
    'last_minute_lead': room.lastMinuteLead
  })
})

module.exports = router
