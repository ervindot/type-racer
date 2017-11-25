
import React, { Component } from 'react'

export default class TypingGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      textNumber: 0,
      lastWord: '',
      typed: ''
    }
  }

  get currentText () {
    const {texts} = this.props
    const {textNumber} = this.state
    return texts[textNumber]
  }

  render () {
    const {playing} = this.props
    if (!playing) return null
    return (
      <div>
        <div>{this.currentText}</div>
        <input onKeyPress={event => this.handleInput(event)} type="text" />
      </div>
    )
  }

  handleInput (event) {
    event.preventDefault()
    const {target, which, keyCode, ctrlKey} = event
    if (ctrlKey) return

    const charCode = which || keyCode
    const newKey = String.fromCharCode(charCode)

    const {typed, lastWord} = this.state
    const typedText = typed + newKey
    if (this.currentText.startsWith(typedText)) {
      const newState = {typed: typedText}
      if (newKey === ' ') {
        target.value = ''
        newState.lastWord = ''
      } else {
        const newWord = lastWord + newKey
        target.value = newWord
        newState.lastWord = newWord
      }
      this.setState(newState)
    } else {
      // TODO: display error to user
      console.log('incorrect')
    }
  }
}
