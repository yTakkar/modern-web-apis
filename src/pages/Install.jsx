import React, { useRef, useEffect } from 'react'

const Install = props => {
  const installPrompt = useRef(undefined)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installPrompt.current = e;
    })
  })

  const installApp = () => {
    if (!installPrompt.current) {
      return;
    }

    installPrompt.current.prompt();
    installPrompt.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }
  
  return (
    <div>
      <br/>
      <button onClick={installApp} >Install app?</button>
    </div>
  )
}

export default Install;