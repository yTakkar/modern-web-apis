import React from 'react'
import Back from '../../components/Back'

const Call = props => {
  return (
    <div>
      <Back/>

      <h3>Call from both desktop and mobile</h3>

      <a href='tel:+918104570640'>Call me?</a>

    </div>
  )
}

export default Call;