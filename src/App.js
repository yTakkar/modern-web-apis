import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import logo512 from './images/logo512.png'
import logo192 from './images/logo192.png'

const RouteLoader = Component => props => {
  return (
    <Suspense fallback='Loading..'>
      <Component {...props} />
    </Suspense>
  );
};

const Home = RouteLoader(React.lazy(() => import('./pages/Home')))
const About = RouteLoader(React.lazy(() => import('./pages/About')))
const Profile = RouteLoader(React.lazy(() => import('./pages/Profile')))

function App() {
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
    <div className="App">
      <Router>
        <div>
          <Link to='/' >Home</Link>{' '}
          <Link to='/about' >About</Link>{' '}
          <Link to='/profile' >Profile</Link>
        </div>

        <div>
          <br/>
          <button onClick={installApp} >Install app?</button>
        </div>

        <div>
          <Switch>
            <Route path='/' exact component={Home}  />
            <Route path='/about' exact component={About}  />
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>

        <img alt='ddd' src={logo192} />
        {/* <img alt='ddd' src={logo512} /> */}
      </Router>
    </div>
  );
}

export default App;
