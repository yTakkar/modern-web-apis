import React, { useRef, useState, useEffect } from 'react'

const WakeLockApi = props => {
  const wakeLock = useRef(null)
  const [wakeLockEnabled, setWakeLockEnabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const enableWakeLock = async () => {
    if ('WakeLock' in window && 'request' in window.WakeLock) {
      try {
        wakeLock.current = await navigator.wakeLock.request('screen');
        console.log('Screen Wake Lock is active');
        setWakeLockEnabled(true)
      } catch (err) {
        setErrorMessage(`${err.name}, ${err.message}`);
        setWakeLockEnabled(false)
      }
    } else {
      setErrorMessage('WakeLock API is not supported in your browser!')
    }
  }

  const disableWakeLock = () => {
    wakeLock.current.release();
    setWakeLockEnabled(false)
  }

  useEffect(() => {
    if (wakeLock.current) {
      wakeLock.current.addEventListener('release', () => {
        console.log('Screen Wake Lock was released');
        setWakeLockEnabled(false)
      });
    }
  }, [wakeLockEnabled])

  return (
    <div>
      <h3>Wake lock API</h3>

      {wakeLockEnabled 
        ? <button onClick={disableWakeLock} >Disable wake lock</button> 
        : <button onClick={enableWakeLock} >Enable wake lock</button>
      }

      <i>
        {wakeLockEnabled ? "Your device won't sleep now" : null}
      </i>

      <div>
        {errorMessage && `Error: ${errorMessage}`}
      </div>
    </div>
  )
}

export default WakeLockApi;