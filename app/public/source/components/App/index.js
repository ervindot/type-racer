import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount () {
    const socket = window.io()
    const joinData = {
      room: window.roomname,
      user: window.username
    }
    socket.emit('join', joinData)
  }

  render () {
    return (
      <h1>Hello World!</h1>
    )
  }
}
