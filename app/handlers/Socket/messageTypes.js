const SOCKET_MESSAGE_TYPES = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  ERROR: 'server_error',
  JOIN: 'join',
  LEAVE: 'leave',
  READY: 'ready',
  START: 'start'
}

module.exports = SOCKET_MESSAGE_TYPES
