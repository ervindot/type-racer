class Room {
  constructor (name) {
    this.name = name
    this.users = {}
    this.createdAt = new Date()
  }

  get activeUsers () {
    return Object.values(this.users).length
  }

  get activeSince () {
    const now = new Date()
    const difference = (now.getTime() - this.createdAt.getTime())
    const secondsActive = Math.floor(difference / 1000)
    return secondsActive
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
}

module.exports = Room
