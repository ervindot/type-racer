class User {
  constructor ({name, id, room}) {
    this.name = name
    this.id = id
    this.room = room
    this.ready = false
    this.kpm = 0
  }
}

module.exports = User
