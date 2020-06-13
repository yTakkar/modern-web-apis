import React, { useEffect, useState } from 'react'

const FullScreen = props => {
  const [isFullscreenView, toggleFullscreenView] = useState(false)

  useEffect(() => {
    const onChange = e => {
      toggleFullscreenView(!isFullscreenView)
    }

    document.addEventListener('fullscreenchange', onChange)

    return () => {
      document.removeEventListener('fullscreenchange', onChange)
    }
  }, [isFullscreenView])

  const goFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div>
      <h3>FullScreen API</h3>
      <button onClick={goFullscreen} >{isFullscreenView ? 'Exit FullScreen' : 'Go FullScreen'}</button>
    </div>
  )
}

export default FullScreen;