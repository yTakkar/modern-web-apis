import React from 'react'
import Back from '../../components/Back';

const Vibrate = props => {
  const vibrate = () => {
    if (navigator.vibrate) {
      // window.navigator.vibrate(200);
      navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]); // Vibrate 'SOS' in Morse.
    }
  }

  return (
    <div>
      <Back/>

      <h3>Vibration API</h3>

      <button onClick={vibrate} >Vibrate</button>
    </div>
  )
}

export default Vibrate;