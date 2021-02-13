/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import Back from '../../components/Back'

const ERROR_CODE_MESSAGES = {
  1: 'You have denied the permission',
  2: 'Unable to fetch your location',
  3: 'Took too long to fetch your location'
}

const GeoLocation = props => {

  const [error, setError] = useState(null)

  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  })

  const onSuccess = (position) => {
    const { coords } = position;
    setCurrentPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  const onError = (error) => {
    setError(ERROR_CODE_MESSAGES[error.code])
  }

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
      setError('API not supported in your browser!')
    }
  }

  return (
    <div>
      <Back/>

      <br/>

      <button onClick={getCurrentPosition}>Get current position</button>
      
      <br/>
      <br/>

      {currentPosition.latitude ? <div>
        <div>Latitude: {currentPosition.latitude}</div>
        <div>Longitude: {currentPosition.longitude}</div>
      </div> : null}

      <div>{error}</div>
    </div>
  )
}

export default GeoLocation;