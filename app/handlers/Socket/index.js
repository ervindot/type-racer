const socketLog = require('debug')('typeracer:socket')
const socketIO = require('socket.io')

const {Room, currentRooms} = require('../Room')
const User = require('../User')

let websocket

function startWebSocket (server) {
  websocket = socketIO(server)
  websocket.on('connection', handleConnection)
}

function handleConnection (socket) {
  socketLog('An user connected')

  socket.on('join', joinRoom)
  socket.on('disconnect', handleDisconnection)

  function joinRoom (message) {
    const {userName, roomName} = message
    socketLog(`User "${userName}" wants to join room "${roomName}"`)

    let room = currentRooms[roomName]
    if (!room) {
      socketLog(`Creating room "${roomName}"`)
      currentRooms[roomName] = new Room(roomName)
      room = currentRooms[roomName]
    }

    const userExists = room.getUser(userName)
    if (userExists) {
      socket.emit('join', {error: true, message: 'Username already taken'})
      socketLog(`User "${userName}" already exists in room "${roomName}"`)
      return
    }

    socketLog(`Creating user "${userName}"`)

    const newUser = new User({name: userName, id: socket.id, room: roomName})
    room.addUser(newUser)
    socket.user = newUser
    socket.join(roomName)
    socket.emit('join', {message: `You joined room ${roomName}`})
    websocket.to(roomName).emit('user', {action: 'join', user: userName})
    socketLog(`User "${userName}" joined room "${roomName}"`)
  }

  function handleDisconnection () {
    const userName = socket.user && socket.user.name
    const roomName = socket.user && socket.user.room
    const room = roomName && currentRooms[roomName]

    if (room && userName) {
      room.removeUser(userName)
      socketLog(`User "${userName}" was removed from room "${room.name}"`)

      room.activeUsers < 1
        ? delete currentRooms[room.name]
        : websocket.to(room.name).emit('user', {action: 'leave', user: userName})
    }

    socketLog('User disconnected')
  }
}

module.exports = {
  startWebSocket
}
