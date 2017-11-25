const socketLog = require('debug')('typeracer:socket')
const socketIO = require('socket.io')

const User = require('../User')
const {Room, currentRooms} = require('../Room')
const {getRandomTexts} = require('../RandomText')

const {
  CONNECTION, DISCONNECT, GAME_START, ROOM_INFO, SERVER_ERROR, USER_JOIN,
  USER_LEAVE, USER_READY
} = require('./messageTypes')

let websocket

function startWebSocket (server) {
  websocket = socketIO(server)
  websocket.on(CONNECTION, handleConnection)
}

function handleConnection (socket) {
  socketLog('An user connected')

  socket.on(USER_JOIN, joinRoom)
  socket.on(USER_READY, userReady)
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

    if (room.playing) {
      socketLog(`Game already started in room "${roomName}", user ${userName} can't join.`)
      socket.emit(SERVER_ERROR, {message: 'Game already started.'})
      return
    }

    const userExists = room.getUser(userName)
    if (userExists) {
      socketLog(`User "${userName}" already exists in room "${roomName}"`)
      socket.emit(SERVER_ERROR, {message: 'Username already taken'})
      return
    }

    socketLog(`Creating user "${userName}"`)
    const newUser = new User({name: userName, id: socket.id, room: roomName})

    socketLog(`Sending room information to "${userName}"`)
    socket.emit(ROOM_INFO, room)

    socketLog(`Joining user "${userName}" to room "${roomName}"`)
    room.addUser(newUser)
    socket.user = newUser
    socket.join(roomName)

    socketLog(`Emitting "${USER_JOIN}" to room "${roomName}"`)
    websocket.to(roomName).emit(USER_JOIN, {user: newUser})
  }

  function userReady (message) {
    const user = socket.user
    if (!user) {
      socket.emit(SERVER_ERROR, {message: 'You did not join a room.'})
      return
    }

    user.ready = true
    websocket.to(user.room).emit(USER_READY, {user})

    const room = currentRooms[user.room]
    if (room.activeUsers > 1 && room.allUsersReady) {
      getRandomTexts()
        .then(text => {
          room.startGame(text)
          websocket.to(user.room).emit(GAME_START, {text, end: room.gameEnd})
        })
        .catch(error => {
          console.error(error)
          websocket.to(user.room).emit(SERVER_ERROR, {
            message: 'Error generating random text.'
          })
        })
    }
  }

  function removeUser () {
    const user = socket.user
    const userName = user && user.name
    const roomName = user && user.room
    const room = roomName && currentRooms[roomName]

    if (room && userName) {
      room.removeUser(userName)
      socketLog(`User "${userName}" was removed from room "${roomName}"`)

      room.activeUsers < 1
        ? delete currentRooms[roomName]
        : websocket.to(roomName).emit(USER_LEAVE, {user})
    }

    socketLog('User disconnected')
  }
}

module.exports = {
  startWebSocket
}
