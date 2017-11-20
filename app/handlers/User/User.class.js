class User {
  constructor ({name, id, room}) {
    this.name = name
    this.id = id
    this.room = room
    this.ready = false
  }
}

module.exports = User
