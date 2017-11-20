const socketLog = require('debug')('typeracer:socket')
const socketIO = require('socket.io')

const User = require('../User')
const {Room, currentRooms} = require('../Room')
const {
  CONNECTION,
  DISCONNECT,
  ERROR,
  JOIN,
  LEAVE,
  READY,
  START
} = require('./messageTypes')

let websocket

function startWebSocket (server) {
  websocket = socketIO(server)
  websocket.on(CONNECTION, handleConnection)
}

function handleConnection (socket) {
  socketLog('An user connected')

  socket.on(JOIN, joinRoom)
  socket.on(READY, userReady)
  socket.on(DISCONNECT, removeUser)

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
      socket.emit(ERROR, {message: 'Username already taken'})
      socketLog(`User "${userName}" already exists in room "${roomName}"`)
      return
    }

    socketLog(`Creating user "${userName}"`)

    const newUser = new User({name: userName, id: socket.id, room: roomName})
    room.addUser(newUser)
    socket.user = newUser
    socket.join(roomName)
    websocket.to(roomName).emit(JOIN, {user: userName})
    socketLog(`User "${userName}" joined room "${roomName}"`)
  }

  function userReady (message) {
    const user = socket.user
    if (!user) {
      socket.emit(ERROR, {message: 'You did not join a room.'})
      return
    }

    user.ready = true
    websocket.to(user.room).emit(READY, {user: user.name})

    const room = currentRooms[user.room]
    if (room.allUsersReady) {
      websocket.to(user.room).emit(START, {text: room.text})
    }
  }

  function removeUser () {
    const userName = socket.user && socket.user.name
    const roomName = socket.user && socket.user.room
    const room = roomName && currentRooms[roomName]

    if (room && userName) {
      room.removeUser(userName)
      socketLog(`User "${userName}" was removed from room "${roomName}"`)

      room.activeUsers < 1
        ? delete currentRooms[roomName]
        : websocket.to(roomName).emit(LEAVE, {user: userName})
    }

    socketLog('User disconnected')
  }
}

module.exports = {
  startWebSocket
}
