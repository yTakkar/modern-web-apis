import React, { useRef, useEffect, useState } from 'react'

const Install = props => {
  const [show, toggle] = useState(false);
  const prompt = useRef(undefined);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      console.log('Received beforeinstallprompt event', e);
      e.preventDefault(); // hide in-built install UI
      prompt.current = e; // store prompt object
      toggle(true); // show custom UI
    });

    window.addEventListener('appinstalled', e => {
      setTimeout(() => {
        toggle(false)
      }, 1500)
    })
  }, []);
 
  const showPrompt = () => {
    prompt.current.prompt(); // show prompt
    prompt.current.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        toggle(false)
      } else {
        console.log('User dismissed the install prompt');
        toggle(true)
      }
    });
  };
  
  return (
    <div>
      <br/>
     {show ? 
      <button onClick={showPrompt} >Install app</button> 
      : <div>You either have already installed the app or installation is not supported in your browser</div>
    }
    </div>
  )
}

export default Install;