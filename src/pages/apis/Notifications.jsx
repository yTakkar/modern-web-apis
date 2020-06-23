import React, { useState } from 'react'
import Back from '../../components/Back'

const Notifications = props => {
  const [errorMessage, setErrorMessage] = useState('')
 
  const notify = () => {
    new Notification('Hi', {
      body: 'Body',
    })
  }

  const showNotification = () => {
    if (!window.Notification) {
      setErrorMessage('This browser does not support notification API')
    } else {
      if (Notification.permission === 'granted') {
        notify()
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission()
          .then(permission => {
            if (permission === 'granted') {
              notify()
            }
          })
          .catch(err => {
            setErrorMessage(err)
          })
      }
    }
  }
  
  return (
    <div>
      <Back/>

      <h3>Notifications API</h3>
      <button onClick={showNotification} >Show notification</button>

      <div>
        {errorMessage && `Error: ${errorMessage}`}
      </div>
    </div>
  )
}

export default Notifications;