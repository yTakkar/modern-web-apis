/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'

const OnlineState = props => {
  const [error, setError] = useState(null)
  const [isOnline, toggleIsOnline] = useState(true)

  const updateIsOnline = () => {
    toggleIsOnline(navigator.onLine);
  }

  useEffect(() => {
    if (!navigator.onLine) {
      setError('API not supported in your browser')
    } else {
      updateIsOnline();
      window.addEventListener('online', updateIsOnline)
      window.addEventListener('offline', updateIsOnline)
    }

    return () => {
      window.removeEventListener('online', updateIsOnline)
      window.removeEventListener('offline', updateIsOnline)
    }
  }, [])

  return (
    <div>
      <Back/>

      <br/>

      {error ? <div>{error}</div> : <div>You are <b>{isOnline ? 'online' : 'offline'}</b></div>}
    </div>
  )
}

export default OnlineState;