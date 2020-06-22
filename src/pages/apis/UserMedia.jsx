import React, { useRef, useState, useEffect } from 'react'

const defaultVideoOptions = {
  width: 360,
  height: 360,
  cameraMode: 'front',
}

const defaultAudioOptions = {
  volume: 1,
}

const UserMedia = props => {
  const videoRef = useRef(null)  
  const [errorMessage, setErrorMessage] = useState('')

  const [videoOptions, setVideoOptions] = useState(defaultVideoOptions)
  const [audioOptions, setAudioOptions] = useState(defaultAudioOptions)

  const [videoStream, setVideoStream] = useState(null)
 
  const getVideoConstraints = () => {
    return {
      width: videoOptions.width,
      height: videoOptions.height,
      facingMode: videoOptions.cameraMode === 'front' ? "user" : "environment",
    }
  }

  const getAudioConstraints = () => {
    return {
      volume: audioOptions.volume,
    }
  }

  const startLivestream = () => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: getVideoConstraints(),
        audio: getAudioConstraints(),
      })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;               
        
        if (mediaStream) {
          setVideoStream(mediaStream)
        }
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        }
      })
      .catch(e => setErrorMessage(e.message))

    } else {
      setErrorMessage('MediaDevices.getUserMedia is not supported in your browser')
    }
  }

  const getVideoTrack = () => {
    const tracks = videoStream?.getVideoTracks() || [];
    return tracks[0]
  }

  const getAudioTrack = () => {
    const tracks = videoStream?.getAudioTracks() || [];
    return tracks[0]
  }

  const stopLivestream = () => {
    const track = getVideoTrack()
    if (track) {
      track.stop();
      videoRef.current.srcObject = null;
      setVideoStream(null)
      setAudioOptions(defaultAudioOptions)
      setVideoOptions(defaultVideoOptions)
    }
  }

  useEffect(() => {
    const videoTrack = getVideoTrack()
    const audioTrack = getAudioTrack();

    if (videoTrack) {
      videoTrack.applyConstraints(getVideoConstraints())
    }
    if (audioTrack) {
      audioTrack.applyConstraints(getAudioConstraints())
    }

    // constraints.volume is deprecated and not recommended to use. Hence, updating video's volume.
    videoRef.current.volume = audioOptions.volume;
  }, [videoOptions, audioOptions]) // eslint-disable-line

  const handleVideoSize = e => {
    const [width, height] = e.target.value.split('x')
    setVideoOptions({ 
      ...videoOptions, 
      width: Number(width), 
      height: Number(height)
    })
  }

  const handleCameraOptions = e => {
    setVideoOptions({
      ...videoOptions,
      cameraMode: e.target.value
    })
  }

  const toggleVolume = () => {
    setAudioOptions({
      ...audioOptions,
      volume: audioOptions.volume === 0 ? 1 : 0
    })
  }

  const handleVolumeChange = e => {
    setAudioOptions({
      ...audioOptions,
      volume: Number(e.target.value)
    })
  }

  return (
    <div>
      <h3>We can use MediaDevice's getUserMedia API to capture user's media.</h3>

      <b>Video settings:</b>&nbsp;&nbsp;
      <div>
        <span>Video size: </span>
        <select value={`${videoOptions.width}x${videoOptions.height}`} onChange={handleVideoSize} >
          <option value='1280x720'>1280x720</option>
          <option value='360x360'>360x360</option>
        </select>{' '}
      </div>
      <div>
        <span>Camera mode: </span>
        <select value={videoOptions.cameraMode} onChange={handleCameraOptions} >
          <option value='front'>Front</option>
          <option value='back'>Back</option>
        </select>
      </div>

      <br/>
      <b>Audio settings:</b>&nbsp;&nbsp;
      <div>
        <span>Mute: </span>
        <button onClick={toggleVolume}>{audioOptions.volume === 0 ? 'Unmute' : 'Mute'}</button>
      </div>
      <span>Volume: </span>
      <select value={audioOptions.volume} onChange={handleVolumeChange}>
        <option value='0.0'>0%</option>
        <option value='0.2'>20%</option>
        <option value='0.4'>40%</option>
        <option value='0.6'>60%</option>
        <option value='0.8'>80%</option>
        <option value='1'>100%</option>
      </select>

      <br/><br/>
      {!videoStream 
        ? <button onClick={startLivestream} >Start Livestream</button> 
        : <button onClick={stopLivestream} >Stop Livestream</button>
      }

      <br/>
      <br/>

      <video ref={videoRef} />

      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default UserMedia;