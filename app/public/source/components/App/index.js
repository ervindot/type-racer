import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount () {
    const socket = window.io()
    const joinData = {
      roomName: window.roomname,
      userName: window.username
    }
    console.log('Sending join data:', joinData)

    socket.emit('join', joinData)

    socket.on('join', message => {
      console.log('Got join message:', message)
    })

    socket.on('user', message => {
      console.log('Got user message:', message)
    })
  }

  render () {
    return (
      <h1>Hello World!</h1>
    )
  }
}
