import React, { useState, useRef } from 'react'
import Back from '../../components/Back';
import { Link } from 'react-router-dom';

const ScreenMedia = props => {
  const [errorMessage, setErrorMessage] = useState('')
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null)

  const startScreenShare = () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          width: 420,
          height: 420
        },
        audio: false,
      })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;

        if (mediaStream) {
          setMediaStream(mediaStream)
        }

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        }
      })
      .catch(e => setErrorMessage(e.message))
      
    } else {
      setErrorMessage('MediaDevices.getDisplayMedia is not supported in your browser')
    }
  }

  const getVideoTrack = () => {
    const tracks = mediaStream?.getVideoTracks() || [];
    return tracks[0]
  }

  const getAudioTrack = () => {
    const tracks = mediaStream?.getAudioTracks() || [];
    return tracks[0]
  }

  const stopScreenShare = () => {
    const videoTrack = getVideoTrack()
    const audioTrack = getAudioTrack()
    if (videoTrack) {
      videoTrack.stop();
    }
    if (audioTrack) {
      audioTrack.stop();
    }
    videoRef.current.srcObject = null;
    setMediaStream(null)
  }

  return (
    <div>
      <Back/>
      
      <h3>We can use MediaDevice's getDisplayMedia API to capture user's screen media.</h3>
      <div>You can use getUserMedia's constraints/options also. Have a look at <Link to='/api/user-media'>UserMedia</Link> for in-detail demo.</div>
      <br/>

      {!!mediaStream 
        ? <button onClick={stopScreenShare}>Stop screen share</button> 
        : <button onClick={startScreenShare}>Start screen share</button>
      }

      <br/>
      <br/>

      <video ref={videoRef} />

      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default ScreenMedia;