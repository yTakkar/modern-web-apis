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
        <Link to='/api/vibrate'>Vibrate</Link>
        <Link to='/api/media-session'>MediaSession</Link>
        <Link to='/api/fullscreen'>FullScreen</Link>
        <Link to='/api/screen-no-sleep'>Wake lock with NoSleep.js</Link>
        <Link to='/api/wakelock'>WakeLock</Link>
        <Link to='/api/notifications'>Notifications</Link>
        <Link to='/api/push-notifications'>Push Notifications</Link>
        <Link to='/api/text-fragments'>Text Fragments</Link>
        <Link to='/api/idle-detector'>Idle Detector</Link>
        <Link to='/api/user-media'>User Media</Link>
        <Link to='/api/screen-media'>Screen Media</Link>
        <Link to='/api/contacts'>Contacts</Link>
        <Link to='/api/clipboard'>Clipboard</Link>
        <Link to='/api/payment-request'>PaymentRequest</Link>
      </div>
    </>
  )
}

export default Header;