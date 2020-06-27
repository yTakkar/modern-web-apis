import React, { useEffect } from 'react'
import Back from '../../components/Back'

const Profile = props => {

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const parsedUrl = new URL(window.location);
      console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
      console.log('Text shared: ' + parsedUrl.searchParams.get('description'));
      console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
    });
  }, [])

  return (
    <div>
      <Back/>
      <h3>Share Target API</h3>
      <div>We can use this API to receive 'shares'</div>

    </div>
  )
}

export default Profile;