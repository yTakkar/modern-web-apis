/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import Back from '../../components/Back'

const NetworkInformation = props => {
  const getConnection = () => {
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;
  }

  const [error, setError] = useState(null)
  const [networkInformation, setNetworkInformation] = useState({
    networkType: null,
    effectiveType: null,
  })
  const connection = useRef(getConnection())

  const updateNetworkInformation = () => {
    setNetworkInformation({
      networkType: connection.current.type,
      effectiveType: connection.current.effectiveType,
    })
  }

  useEffect(() => {
    if (connection.current) {
      updateNetworkInformation()
    } else {
      setError('API not supported in your browser.')
    }
  }, [])

  return (
    <div>
      <Back/>

      <br/>

      {error ? <div>{error}</div> : <div>
        <div>Network Type: {networkInformation.networkType || '<Not supported in your browser>'}</div>
        <div>Effective Type: {networkInformation.effectiveType || '<Not supported in your browser>'}</div>
      </div>}

    </div>
  )
}

export default NetworkInformation;