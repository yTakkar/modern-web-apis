import React, { useState, useRef, useEffect } from 'react'

const getAwesomePlaylist = () => {
  const BASE_URL = 'https://storage.googleapis.com/media-session/';

  return [{
    src: BASE_URL + 'sintel/snow-fight.mp3',
    title: 'Snow Fight',
    artist: 'Jan Morgenstern',
    album: 'Sintel',
    artwork: [
      { src: BASE_URL + 'sintel/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
      { src: BASE_URL + 'sintel/artwork-128.png', sizes: '128x128', type: 'image/png' },
      { src: BASE_URL + 'sintel/artwork-192.png', sizes: '192x192', type: 'image/png' },
      { src: BASE_URL + 'sintel/artwork-256.png', sizes: '256x256', type: 'image/png' },
      { src: BASE_URL + 'sintel/artwork-384.png', sizes: '384x384', type: 'image/png' },
      { src: BASE_URL + 'sintel/artwork-512.png', sizes: '512x512', type: 'image/png' },
    ]
  }, {
    src: BASE_URL + 'big-buck-bunny/prelude.mp3',
    title: 'Prelude',
    artist: 'Jan Morgenstern',
    album: 'Big Buck Bunny',
    artwork: [
      { src: BASE_URL + 'big-buck-bunny/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
      { src: BASE_URL + 'big-buck-bunny/artwork-128.png', sizes: '128x128', type: 'image/png' },
      { src: BASE_URL + 'big-buck-bunny/artwork-192.png', sizes: '192x192', type: 'image/png' },
      { src: BASE_URL + 'big-buck-bunny/artwork-256.png', sizes: '256x256', type: 'image/png' },
      { src: BASE_URL + 'big-buck-bunny/artwork-384.png', sizes: '384x384', type: 'image/png' },
      { src: BASE_URL + 'big-buck-bunny/artwork-512.png', sizes: '512x512', type: 'image/png' },
    ]
  }, {
    src: BASE_URL + 'elephants-dream/the-wires.mp3',
    title: 'The Wires',
    artist: 'Jan Morgenstern',
    album: 'Elephants Dream',
    artwork: [
      { src: BASE_URL + 'elephants-dream/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
      { src: BASE_URL + 'elephants-dream/artwork-128.png', sizes: '128x128', type: 'image/png' },
      { src: BASE_URL + 'elephants-dream/artwork-192.png', sizes: '192x192', type: 'image/png' },
      { src: BASE_URL + 'elephants-dream/artwork-256.png', sizes: '256x256', type: 'image/png' },
      { src: BASE_URL + 'elephants-dream/artwork-384.png', sizes: '384x384', type: 'image/png' },
      { src: BASE_URL + 'elephants-dream/artwork-512.png', sizes: '512x512', type: 'image/png' },
    ]
  }, {
    src: BASE_URL + 'caminandes/original-score.mp3',
    title: 'Original Score',
    artist: 'Jan Morgenstern',
    album: 'Caminandes 2: Gran Dillama',
    artwork: [
      { src: BASE_URL + 'caminandes/artwork-96.png',  sizes: '96x96',   type: 'image/png' },
      { src: BASE_URL + 'caminandes/artwork-128.png', sizes: '128x128', type: 'image/png' },
      { src: BASE_URL + 'caminandes/artwork-192.png', sizes: '192x192', type: 'image/png' },
      { src: BASE_URL + 'caminandes/artwork-256.png', sizes: '256x256', type: 'image/png' },
      { src: BASE_URL + 'caminandes/artwork-384.png', sizes: '384x384', type: 'image/png' },
      { src: BASE_URL + 'caminandes/artwork-512.png', sizes: '512x512', type: 'image/png' },
    ]
  }];
}

const MediaSession = props => {
  const audioRef = useRef(null)
  const [audioIndex, setAudioIndex] = useState(0)
  const playlist = getAwesomePlaylist()
  const currentSong = playlist[audioIndex];

  const updateMetadata = () => {
    console.log('Playing ' + currentSong.title + ' track...');

    // eslint-disable-next-line
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: currentSong.artist,
      album: currentSong.album,
      artwork: currentSong.artwork
    });

    updatePositionState();
  }

  const updatePositionState = () => {
    console.log('Updating position state...');

    navigator.mediaSession.setPositionState({
      duration: audioRef.current.duration,
      playbackRate: audioRef.current.playbackRate,
      position: audioRef.current.position
    });
  }

  const playAudio = () => {
    audioRef.current.play()
      .then(() => updateMetadata())
      .catch(console.log)
  }

  useEffect(() => {
    navigator.mediaSession.setActionHandler('previoustrack', function() {
      console.log('> User clicked "Previous Track" icon.');
      setAudioIndex((audioIndex - 1 + playlist.length) % playlist.length);
      playAudio();
    });
    
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      console.log('> User clicked "Next Track" icon.');
      setAudioIndex((audioIndex + 1) % playlist.length)
      playAudio();
    });

    audioRef.current.addEventListener('ended', function() {
      // Play automatically the next track when audio ends.
      setAudioIndex((audioIndex - 1 + playlist.length) % playlist.length);
      playAudio();
    });

    let defaultSkipTime = 10; /* Time to skip in seconds by default */

    navigator.mediaSession.setActionHandler('seekbackward', function(event) {
      console.log('> User clicked "Seek Backward" icon.');
      const skipTime = event.seekOffset || defaultSkipTime;
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - skipTime, 0);
      updatePositionState();
    });

    navigator.mediaSession.setActionHandler('seekforward', function(event) {
      console.log('> User clicked "Seek Forward" icon.');
      const skipTime = event.seekOffset || defaultSkipTime;
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + skipTime, audioRef.current.duration);
      updatePositionState();
    });

    navigator.mediaSession.setActionHandler('play', async function() {
      console.log('> User clicked "Play" icon.');
      await audioRef.current.play();
      navigator.mediaSession.playbackState = "playing";
      // Do something more than just playing audio...
    });
    
    navigator.mediaSession.setActionHandler('pause', async function() {
      console.log('> User clicked "Pause" icon.');
      audioRef.current.pause();
      navigator.mediaSession.playbackState = "paused";
      // Do something more than just pausing audio...
    });
  }, [audioIndex]) // eslint-disable-line

  return (
    <div>
      <h3>MediaSession API</h3>
      <button onClick={playAudio} >Play audio</button>
      <audio key={audioIndex} ref={audioRef} src={currentSong.src} />
    </div>
  )
}

export default MediaSession;