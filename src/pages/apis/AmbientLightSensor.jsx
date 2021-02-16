import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'

const _AmbientLightSensor = props => {
  const [error, setError] = useState(null)
  const [light, setLight] = useState(null)

  useEffect(() => {
    if ("AmbientLightSensor" in window) {
      const sensor = new window.AmbientLightSensor()

      sensor.onreading = () => {
        setLight(sensor.illuminance);
      }

      sensor.onerror = (event) => {
        setError(event.error.message)
      }

      sensor.start();

    } else {
      setError('API is not supported in your browser')
    }
  }, [])

  return (
    <div>
      <Back/>

      <br/>

      <div>
        Current light level: {light || '<No value received>'}
      </div>

      <br/>
 
      <div>{error}</div>
    </div>
  )
}

export default _AmbientLightSensor;
