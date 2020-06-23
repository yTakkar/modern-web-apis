import React, { useEffect, useState, useRef } from 'react'
import Back from '../../components/Back';

const FullScreen = props => {
  const [isFullscreenView, toggleFullscreenView] = useState(false)
  const imgRef = useRef(null);

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
    if (!isFullscreenView) {
      imgRef.current.requestFullscreen()
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div>
      <Back/>

      <h3>FullScreen API</h3>
      <img onClick={goFullscreen} ref={imgRef} src='/taj-mahal-1.jpg' alt='TajMahal' width='350' style={{
        cursor: isFullscreenView ? 'zoom-out' : 'zoom-in',
      }} />
      <div>
        <i>Click on the image to toggle the above image in fullscreen mode.</i>
      </div>
      <br/>
    </div>
  )
}

export default FullScreen;