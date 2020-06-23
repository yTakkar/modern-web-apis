import React, { useEffect, useState } from 'react'
import Back from '../../components/Back'

const IdleDetectorApi = props => {
  const [idleState, setIdleState] = useState({})
  const [isDetectionOn, toggleDetection] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const controller = new AbortController();

  const startIdleDetection = () => {
    if (window.IdleDetector) {
      // eslint-disable-next-line
      const idleDetector = new IdleDetector()
      idleDetector.addEventListener('change', () => {
        console.log(idleDetector.state)
        setIdleState(idleDetector.state);
      })

      idleDetector.start({
        threshold: 60 * 1000, // minimum 60 secs
        signal: controller.signal
      }).then(() => {
        console.log('IdleDetector is active.')
        toggleDetection(true)
      })
    } else {
      setErrorMessage('IdleDetector is not supported in your browser')
    }
  }

  const stopIdleDetection = () => {
    controller.abort()
    toggleDetection(false)
    setIdleState({})
  }

  return (
    <div>
      <Back/>

      <h3>Idle Detector</h3>
      <div>The API can help use detect whether user is idle or the screen is locked.</div>
      <br/>

      {!isDetectionOn 
        ? <button onClick={startIdleDetection}>Start Idle detection</button> 
        : <button onClick={stopIdleDetection}>Stop Idle detection</button>
      }
      
      <div>
        <div>User: {idleState.user}</div>
        <div>Screen: {idleState.screen}</div>
      </div>

      <br/>
      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default IdleDetectorApi;