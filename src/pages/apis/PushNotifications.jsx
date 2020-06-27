import React, { useState, useEffect, useRef } from 'react'
import Back from '../../components/Back'
import { urlB64ToUint8Array } from '../../helpers'
import cookie from 'js-cookie'

/*
  PUBLIC_KEY: BBDrHKLJfxVxcNKygxQzENzEb4mUPsuZrffu0EV6Hg_jyU5oR7LdG4bcrjHq7aWA5v8emlZpTMOIG68Wy5s8ofY
  PRIVATE_KEY: bK22-rLBe0ortsJ44q2HdB28TegnYMLoYkpKlOV0HfE
*/

const PUBLIC_KEY = 'BBDrHKLJfxVxcNKygxQzENzEb4mUPsuZrffu0EV6Hg_jyU5oR7LdG4bcrjHq7aWA5v8emlZpTMOIG68Wy5s8ofY'

const API_DOMAIN = process.env === 'production' ? 'https://awesome-web-apis-server.herokuapp.com' : 'http://localhost:3001'

const PushNotifications = props => {
  const [errorMessage, setErrorMessage] = useState('')
  const [subscription, setSubscription] = useState(null)
  const [subscriptionId, setSubscriptionId] = useState(cookie.get('subscription-id'))
  const swRegisteration = useRef(null)

  const getSubscription = async () => {
    try { 
      const registeration = await navigator.serviceWorker.ready
      swRegisteration.current = registeration;
      const subscription = await registeration.pushManager.getSubscription()
      setSubscription(subscription)
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  useEffect(() => {
    if (Notification.permission === 'denied') {
      setSubscription(null)
    } else {
      getSubscription()
    }
  }, [])  // eslint-disable-line

  const saveSubscription = (subscription) => {
    fetch(`${API_DOMAIN}/api/save-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
    .then(response => response.json())
    .then(response => {
      setSubscription(subscription)
      cookie.set('subscription-id', response.data.id)
      setSubscriptionId(response.data.id)
    })
    .catch(e => setErrorMessage(e.message))
  }

  const subscribe = () => {
    const applicationServerKey = urlB64ToUint8Array(PUBLIC_KEY);
    swRegisteration.current.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    })
    .then(subscription => {
      saveSubscription(subscription)
    })
    .catch(e => setErrorMessage(e.message))
  }

  const unsubscribe = () => {
    try {
      fetch(`${API_DOMAIN}/api/delete-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: subscriptionId })
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)

        if (resp.data.success) {
          subscription.unsubscribe()
          cookie.remove('subscription-id')
          setSubscriptionId(null)
          setSubscription(null)
        }
      })

    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  const triggerNotification = () => {
    fetch(`${API_DOMAIN}/api/trigger-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: subscriptionId })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(e => setErrorMessage(e.message))
  }

  return (
    <div>
      <Back/>

      <div>
        <h3>Push Notifications API</h3>

        {/* <input value='' onChange={e => setUserName(e.target.value)} /> */}

        {subscription
          ? <button onClick={unsubscribe}>Unsubscribe from push notifications</button> 
          : <button onClick={subscribe} >Subscribe to push notifications</button>
        }

        <br/>

        {subscription && <div>
          <pre>{JSON.stringify(subscription, null, 2)}</pre>
        </div>}

        <br/>
        {subscriptionId && <div>
          <button onClick={triggerNotification}>Trigger a push notification</button>
        </div>}

        <br/>
        <br/>

        <div><b>{errorMessage}</b></div>

      </div>
    </div>
  )
}

export default PushNotifications;
