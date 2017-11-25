import React from 'react'

const ReadyButton = ({ready, onClick}) => {
  if (ready) return null
  return <button
    className='button button-primary'
    onClick={onClick}>I am ready!</button>
}

export default ReadyButton
