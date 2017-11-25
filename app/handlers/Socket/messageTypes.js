const SOCKET_MESSAGE_TYPES = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  GAME_START: 'start',
  ROOM_INFO: 'room',
  SERVER_ERROR: 'server_error',
  USER_JOIN: 'join',
  USER_LEAVE: 'leave',
  USER_READY: 'ready'
}

module.exports = SOCKET_MESSAGE_TYPES
