import React from 'react'
import Header from '../../components/Header'

const Home = props => {
  return (
    <div>
      <Header/>

      <br/>
      <br/>
      <div>
        <b>Note: Please access the app on a mobile browser and make sure it's modern. I'd suggest using Chrome Canary.</b>
      </div>

      <br/>
      <div>
        <h4>#TODO</h4>
        <ul>
          <li>File System Access API</li>
          <li>Ambient Light Sensor API</li>
          <li>Bluetooth API</li>
          <li>Page Visibility API</li>
          <li>Network Information API </li>
          <li>Online State API</li>
          <li>Device Memory API</li>
          <li>Web OTP API</li>
          <li>Storage Quota API</li>
          <li>Geolocation API</li>
          <li>MediaQuery API</li>
          <li>Screen Orientation Lock API</li>
          <li>Intersection Observer API</li>
          <li>Mutation Observer API</li>
        </ul>
      </div>
    </div>
  )
}

export default Home;
