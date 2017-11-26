import React, { Component } from 'react'
import moment from 'moment'

const ONE_SECOND = 1000

export default class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: undefined,
      timerText: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const {end} = nextProps
    if (!end || end === this.props.end) return

    clearInterval(this.state.interval)
    const timerEnd = moment(end)

    function updateTimer () {
      const timerText = createTimerText()
      if (timerText === '00:00') clearInterval(this.state.interval)
      this.setState({timerText})
    }

    function createTimerText () {
      const now = moment()
      if (now.isAfter(timerEnd)) return '00:00'
      return moment(timerEnd.diff(now)).format('mm:ss')
    }

    this.setState({
      interval: setInterval(updateTimer.bind(this), ONE_SECOND),
      timerText: createTimerText()
    })
  }

  render () {
    const {timerText} = this.state
    if (!timerText) return null
    return <h2>{timerText}</h2>
  }
}
