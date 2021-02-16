import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'
import { formatBytes } from '../../helpers'

const StorageQuota = props => {
  const [error, setError] = useState(null)
  const [storageInfo, setStorageInfo] = useState({
    quota: null,
    usage: null,
  })

  useEffect(() => {
    if (!navigator.storage.estimate) {
      setError('API is not supported in your browser')
    } else {
      navigator.storage.estimate()
        .then(storageEstimate => {
          console.log(storageEstimate)
          setStorageInfo({
            quota: storageEstimate.quota,
            usage: storageEstimate.usage,
          })
        })
        .catch(e => setError(e.message))
    }
  }, [])

  return (
    <div>
      <Back/>

      <br/>

      {storageInfo.quota ? <div>
        <div>Estimated quota: {formatBytes(storageInfo.quota)}</div>
        <div>Estimated usage: {formatBytes(storageInfo.usage)}</div>
        <div>Estimated usage in percent: {(storageInfo.usage * 100 / storageInfo.quota).toFixed(4)}%</div>
      </div> : null}

      <div>{error}</div>
    </div>
  )
}

export default StorageQuota;