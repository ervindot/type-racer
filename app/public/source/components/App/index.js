import React, { Component } from 'react'

import {
  ERROR,
  JOIN,
  LEAVE,
  READY,
  START
} from '../../handlers/socket/messageTypes'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: window.io(),
      joinData: {
        roomName: window.roomname,
        userName: window.username
      }
    }
  }

  componentDidMount () {
    const {socket, joinData} = this.state

    console.log('Sending join data:', joinData)
    socket.emit(JOIN, joinData)

    socket.on(ERROR, error => {
      console.error(error.message)
    })

    socket.on(JOIN, message => {
      console.log(`User ${message.user} joined.`)
    })

    socket.on(LEAVE, message => {
      console.log(`User ${message.user} leaved.`)
    })

    socket.on(READY, message => {
      console.log(`User ${message.user} is ready.`)
    })

    socket.on(START, message => {
      console.log('Game started!')
      console.log(message.text)
    })
  }

  render () {
    return (
      <div>
        <h1>Hello World!</h1>
        <button onClick={event => this.userReady(event)}>Ready</button>
      </div>
    )
  }

  userReady (event) {
    event.preventDefault()
    const {socket} = this.state
    socket.emit(READY)
  }
}
