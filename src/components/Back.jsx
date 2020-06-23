import React from 'react'
import { useHistory } from 'react-router'

const Back = () => {
  const { goBack } = useHistory()

  const back = e => {
    e.preventDefault();
    goBack()
  }

  return (
    <div>
      <a href='#' onClick={back}>{'<< Back'}</a>
    </div>
  )
}

export default Back;