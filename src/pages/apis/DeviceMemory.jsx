import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'

const DeviceMemory = props => {
  const [error, setError] = useState(null)
  const [deviceMemory, setDeviceMemory] = useState(null)

  useEffect(() => {
    if (!navigator.deviceMemory) {
      setError('API is not supported in your browser.')
    } else {
      setDeviceMemory(navigator.deviceMemory)
    }
  }, [])

  return (
    <div>
      <Back/>

      <br/>

      <div>
        {error ? error : `Your RAM size is ${deviceMemory}`}
      </div>
    </div>
  )
}

export default DeviceMemory;