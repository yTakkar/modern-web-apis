import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div>
        <h4>Pages</h4>{' '}
        <Link to='/' >Home</Link>{' '}
        <Link to='/about' >About</Link>{' '}
        <Link to='/profile' >Profile</Link>
      </div>

      <div className='api-links' style={{ marginTop: 10 }}>
        <h4>Interesting Web APIs</h4>
        <Link to='/api/install' >Install</Link>
        <Link to='/api/share'>Share</Link>
        <Link to='/api/share-target'>Share Target</Link>
        <Link to='/api/vibrate'>Vibrate</Link>
        <Link to='/api/media-session'>MediaSession</Link>
        <Link to='/api/fullscreen'>FullScreen</Link>
        <Link to='/api/screen-no-sleep'>Wake lock with NoSleep.js</Link>
        <Link to='/api/wakelock'>WakeLock</Link>
        <Link to='/api/push-notifications'>Push Notifications</Link>
        <Link to='/api/text-fragments'>Text Fragments</Link>
        <Link to='/api/idle-detector'>Idle Detector</Link>
        <Link to='/api/user-media'>User Media</Link>
        <Link to='/api/screen-media'>Screen Media</Link>
        <Link to='/api/contacts'>Contacts</Link>
        <Link to='/api/clipboard'>Clipboard</Link>
        <Link to='/api/payment-request'>PaymentRequest</Link>
        <Link to='/api/call'>Call</Link>
        <Link to='/api/battery' >Battery</Link>
        <Link to='/api/page-visibility' >Page Visibility</Link>
        <Link to='/api/online-state' >Online State</Link>
        <Link to='/api/network-information' >Network Information</Link>
        <Link to='/api/geo-location' >GeoLocation</Link>
        <Link to='/api/intersection-observer' >Intersection Observer</Link>
        <Link to='/api/device-memory' >Device Memory</Link>
        <Link to='/api/storage-quota' >Storage Quota</Link>
        <Link to='/api/ambient-light-sensor' >Ambient Light Sensor</Link>
        <Link to='/api/file-read' >File Read</Link>
        <Link to='/api/file-write' >File Write</Link>
      </div>
    </>
  )
}

export default Header;
