import React from 'react'
import Back from '../../components/Back'

const About = props => {
  return (
    <div>
      <Back/>

      <h3>The page was created specifically for app shortcuts.</h3>

      <img src='/shortcuts.jpg' alt='Shortcuts' width='360' />
    </div>
  )
}

export default About;