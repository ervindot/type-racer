import React from 'react'

const UserList = ({users, playing}) => {
  return users.map(user => renderUser(user))

  function renderUser (user) {
    return (
      <div className='row' key={user.id}>
        <div className='one-half column'>{user.name}</div>
        <div className='one-half column'>{renderUserInfo(user)}</div>
      </div>
    )
  }

  function renderUserInfo (user) {
    if (user.ready && !playing) return <strong>READY!</strong>
    if (playing) return <strong>KP/m: {user.kpm}</strong>
  }
}

export default UserList
