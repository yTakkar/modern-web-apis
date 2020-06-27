import React, { useEffect, useState } from 'react'
import Back from '../../components/Back'

const Profile = props => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const { searchParams } = new URL(window.location);
    setTitle(searchParams.get('title'))
    setDescription(searchParams.get('description'))
    setUrl(searchParams.get('url'))
  }, [])

  return (
    <div>
      <Back/>
      <h3>Share Target API</h3>
      <div>We can use this API to receive 'shares'</div>

      <br/>

      <div>Title shared: {title}</div>
      <div>Description shared: {description}</div>
      <div>URL shared: {url}</div>

    </div>
  )
}

export default Profile;