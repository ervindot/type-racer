class Room {
  constructor (name) {
    this.name = name
    this.users = {}
  }

  getUser (userName) {
    return this.users[userName]
  }

  addUser (user) {
    this.users[user.name] = user
  }

  removeUser (userName) {
    this.users[userName] = undefined
  }
}

module.exports = Room
