const moment = require('moment')

class Room {
  constructor (name) {
    this.name = name
    this.users = {}
    this.createdAt = moment()
    this.playing = false
    this.gameStart = undefined
    this.gameEnd = undefined
  }

  get activeUsers () {
    return Object.values(this.users).length
  }

  get allUsersReady () {
    const allUsers = Object.values(this.users)
    if (allUsers.length < 1) return false

    const foundNonReadyUser = allUsers.find(user => user.ready === false)
    if (foundNonReadyUser) return false
    else return true
  }

  get activeSince () {
    const now = moment()
    return now.diff(this.createdAt, 'seconds')
  }

  get counter () {
    if (!this.gameEnd) return 0

    const now = moment()
    if (now.isAfter(this.gameEnd)) return 0

    return this.gameEnd.diff(now, 'seconds')
  }

  getUser (userName) {
    return this.users[userName]
  }

  addUser (user) {
    this.users[user.name] = user
  }

  removeUser (userName) {
    delete this.users[userName]
  }

  startGame (text) {
    this.text = text
    this.playing = true

    const now = moment()
    this.gameStart = now
    this.gameEnd = now.add(3, 'minutes').add(1, 'second')
  }
}

module.exports = Room
