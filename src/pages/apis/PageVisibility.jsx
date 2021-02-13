/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'

const PageVisibility = props => {
  const [error, setError] = useState(null)
  const [visibilityMessage, setVisibilityMessage] = useState(null)

  const handleVisibilityChange = e => {
    setVisibilityMessage({
      state: document.visibilityState,
      time: new Date(),
    })
  }

  useEffect(() => {
    if (!document.visibilityState) {
      setError('Page Visibility API is not supported in your browser.')
    } else {
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }

    return () => {
      if (document.visibilityState) {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [])

  return (
    <div>
      <Back/>

      <br/>

      {error ? <div>{error}</div> : <div>{`Page changed to ${visibilityMessage.state} at ${new Date()}`}</div>}
    </div>
  )
}

export default PageVisibility;