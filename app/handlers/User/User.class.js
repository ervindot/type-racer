const moment = require('moment')

class User {
  constructor ({name, id, room}) {
    this.name = name
    this.id = id
    this.room = room
    this.ready = false
    this.startedPlaying = undefined
    this.KPM = {}
    this.bestKPM = 0
  }

  get currentKPM () {
    const now = moment()
    const minute = this.startedPlaying.diff(now, 'minutes')
    const currentKPM = this.KPM[minute] || 0
    return currentKPM
  }

  get keystrokes () {
    return Object.values(this.KPM).reduce((total, kpm) => {
      total = total + kpm
      return total
    }, 0)
  }

  addToCurrentKPM (keystrokes) {
    const now = moment()
    const minute = this.startedPlaying.diff(now, 'minutes')
    const currentKPM = this.KPM[minute] || 0
    const updatedKPM = currentKPM + keystrokes
    this.KPM[minute] = updatedKPM
    if (updatedKPM > this.bestKPM) this.bestKPM = updatedKPM
  }
}

module.exports = User
