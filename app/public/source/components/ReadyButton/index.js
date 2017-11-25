import React from 'react'

const ReadyButton = ({ready, onClick}) => {
  if (!ready) {
    return <button
      className='button button-primary'
      onClick={onClick}>I am ready!</button>
  } else {
    return null
  }
}

export default ReadyButton
