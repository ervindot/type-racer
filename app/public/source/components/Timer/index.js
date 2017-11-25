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

    const timerEnd = moment(end)

    clearInterval(this.state.interval)
    this.setState({
      interval: setInterval(updateTimer.bind(this), ONE_SECOND)
    })

    function updateTimer () {
      const now = moment()

      if (now.isAfter(timerEnd)) {
        clearInterval(this.state.interval)
        this.setState({timerText: '00:00'})
        return
      }

      const timerText = moment(timerEnd.diff(now)).format('mm:ss')
      this.setState({timerText})
    }
  }

  render () {
    const {timerText} = this.state
    if (!timerText) return null
    return <div>{timerText}</div>
  }
}
