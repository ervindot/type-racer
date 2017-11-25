
import React, { Component } from 'react'

export default class TypingGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentText: 0
    }
  }

  render () {
    const {texts, playing} = this.props
    if (!playing) return null

    const {currentText} = this.state
    const text = texts[currentText]
    return (
      <div>
        <div>{text}</div>
        <input type="text" />
      </div>
    )
  }
}
