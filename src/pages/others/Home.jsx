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
          <li>Bluetooth API</li>
          <li>Web OTP API</li>
        </ul>
      </div>
    </div>
  )
}

export default Home;
