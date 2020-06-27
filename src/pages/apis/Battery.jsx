import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'

const Battery = props => {
  const [level, setLevel] = useState(0)
  const [isCharging, setIsCharging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery()
        .then(battery => {

          const updateState = () => {
            setLevel(battery.level)
            setIsCharging(battery.charging)
          }

          updateState();

          battery.addEventListener('levelchange', e => {
            console.log('levelchange')
            updateState()
          })

          battery.addEventListener('chargingchange', e => {
            console.log('chargingchange')
            updateState()
          })
        })
        .catch(e => setErrorMessage(e.message))
    }
  }, [])

  return (
    <div>
      <Back/>
      <h3>Battery API</h3>

      <div>
        <div>Battery level: {level*100}%</div>
        <div>Is charging: {`${isCharging}`}</div>
      </div>

      <br/>
      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default Battery;