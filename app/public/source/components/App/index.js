import React, { Component } from 'react'
import {Socket} from '../../handlers'
const {ERROR, JOIN, LEAVE, READY, START} = Socket.MESSAGE_TYPES

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: window.io(),
      roomName: window.roomname,
      userName: window.username,
      ready: false,
      playing: false,
      users: [],
      text: ''
    }
  }

  componentDidMount () {
    const {socket, roomName, userName} = this.state

    socket.on(JOIN, this.handleSocketJoin.bind(this))
    socket.on(LEAVE, this.handleSocketLeave.bind(this))
    socket.on(READY, this.handleSocketReady.bind(this))
    socket.on(START, this.handleSocketStart.bind(this))
    socket.on(ERROR, this.handleSocketError.bind(this))

    const joinData = {roomName, userName}
    console.log('Sending join data:', joinData)
    socket.emit(JOIN, joinData)
  }

  render () {
    return (
      <div className='container'>
        <h1>Typeracer Like</h1>
        <div className='row'>
          <div className='four columns'>
            { this.renderUsers() }
          </div>
          <div className='eight columns'>
            { this.renderText() }
          </div>
        </div>
        <button
          className='button button-primary'
          onClick={() => this.handleClickReady()}>I am ready!</button>
      </div>
    )
  }

  renderUsers () {
    const {users} = this.state
    return users.map(user => <p key={user.id}>{user.name}</p>)
  }

  renderText () {
    const {text} = this.state
    return <div>{text}</div>
  }

  handleClickReady () {
    console.log(`Emitting ${READY} to server`)
    const {socket} = this.state
    socket.emit(READY)
  }

  handleSocketJoin (message) {
    const joinedUser = message.user
    console.log(`User ${joinedUser.name} joined.`)

    this.setState({
      users: [
        ...this.state.users,
        joinedUser
      ]
    })
  }

  handleSocketLeave (message) {
    const leavedUser = message.user
    console.log(`User ${message.user} leaved.`)

    const {users} = this.state
    const updatedUsers = users.filter(user => user.id !== leavedUser.id)
    this.setState({
      users: updatedUsers
    })
  }

  handleSocketReady (message) {
    const readyUser = message.user
    console.log(`User ${readyUser.name} is ready.`)

    const {users, userName} = this.state
    const user = users.find(user => user.id === readyUser.id)
    user.ready = true

    if (readyUser.name === userName) this.setState({ready: true})
  }

  handleSocketStart (message) {
    console.log('Game started')
    const {text} = message
    this.setState({text, playing: true})
  }

  handleSocketError (error) {
    console.error('Server error:', error.message)
  }
}
