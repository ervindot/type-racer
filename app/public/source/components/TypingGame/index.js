
import React, { Component } from 'react'

export default class TypingGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      textNumber: 0,
      lastWord: '',
      typed: '',
      typeError: false
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

    const currentText = this.currentText
    if (!currentText) {
      return <p>You finished all texts! Wait for the others to finish.</p>
    }

    const {typeError, typed} = this.state
    const notTyped = currentText.replace(typed, '')

    return (
      <div>
        <div>
          <span style={{backgroundColor: '#A5D6A7'}}>{typed}</span>{notTyped}
        </div>
        <input
          type='text'
          style={{border: (typeError) ? 'solid 1px red' : ''}}
          onKeyPress={event => this.handleKeyPress(event)}
          onKeyDown={event => this.handleKeyDown(event)}/>
      </div>
    )
  }

  handleKeyPress (event) {
    event.preventDefault()

    const currentText = this.currentText

    const noTextToType = (!currentText)
    if (noTextToType) return

    const {target, which, keyCode, charCode, ctrlKey} = event
    const pressingControlKey = ctrlKey
    if (pressingControlKey) return

    const characterCode = which || keyCode || charCode
    const pressedKey = String.fromCharCode(characterCode)

    const {typed, lastWord, textNumber} = this.state
    const lastTyped = typed + pressedKey

    const typedTextIsCorrect = (currentText.startsWith(lastTyped))
    if (!typedTextIsCorrect) {
      target.value = lastWord
      this.setState({typeError: true})
      return
    }

    const newState = {typeError: false}
    const typedCompleteText = (currentText === lastTyped)
    const pressedSpaceBar = (pressedKey === ' ')

    if (typedCompleteText) {
      target.value = ''
      newState.textNumber = textNumber + 1
      newState.lastWord = ''
      newState.typed = ''
    } else if (pressedSpaceBar) {
      target.value = ''
      newState.lastWord = ''
      newState.typed = lastTyped
    } else {
      const newWord = lastWord + pressedKey
      target.value = newWord
      newState.lastWord = newWord
      newState.typed = lastTyped
    }

    this.setState(newState)

    const {onKeystroke} = this.props
    onKeystroke(pressedKey)
  }

  handleKeyDown (event) {
    const {which, keyCode, charCode} = event
    const key = keyCode || which || charCode
    const backspace = (key === 8)
    const deleteKey = (key === 46)
    if (backspace || deleteKey) {
      event.preventDefault()
    }
  }
}
