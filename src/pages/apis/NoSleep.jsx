import React, { useState } from 'react'
import NoSleep from 'nosleep.js'
import Back from '../../components/Back';

const noSleep = new NoSleep();

const ScreenNoSleep = props => {
  const [wakeLockEnabled, toggleWakeLock] = useState(false)

  const toggleLock = () => {
    if (!wakeLockEnabled) {
      noSleep.enable();
      toggleWakeLock(true)
    } else {
      noSleep.disable()
      toggleWakeLock(false)
    }
  }

  return (
    <div>
      <Back/>

      <h3>Screen lock/unlock functionality with NoSleep.js</h3>
      <button onClick={toggleLock} >
        {wakeLockEnabled ? 'Disable wake lock' : 'Enable wake lock'}
      </button>

      <i>
        {wakeLockEnabled ? "Your device won't sleep now" : null}
      </i>
    </div>
  )
}

export default ScreenNoSleep;