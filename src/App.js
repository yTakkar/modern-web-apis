import React, { Suspense } from 'react';
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
const Install = RouteLoader(React.lazy(() => import('./pages/Install')))

const Share = RouteLoader(React.lazy(() => import('./pages/apis/Share')))
const Virate = RouteLoader(React.lazy(() => import('./pages/apis/Virate')))
const MediaSession = RouteLoader(React.lazy(() => import('./pages/apis/MediaSession')))
const FullScreen = RouteLoader(React.lazy(() => import('./pages/apis/FullScreen')))
const ScreenNoSleep = RouteLoader(React.lazy(() => import('./pages/apis/NoSleep')))

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h4>Pages</h4>{' '}
          <Link to='/install' >Install</Link>{' '}
          <Link to='/' >Home</Link>{' '}
          <Link to='/about' >About</Link>{' '}
          <Link to='/profile' >Profile</Link>
        </div>

        <div style={{ marginTop: 10 }}>
          <h4>Interesting Web APIs</h4>{' '}
          <Link to='/api/share'>Share</Link>{' '}
          <Link to='/api/vibrate'>Vibrate</Link>{' '}
          <Link to='/api/media-session'>MediaSession</Link>{' '}
          <Link to='/api/fullscreen'>FullScreen</Link>{' '}
          <Link to='/api/screen-no-sleep'>Wake lock with NoSleep.js</Link>{' '}
        </div>

        <div>
          <Switch>
            <Route path='/' exact component={Home}  />
            <Route path='/about' exact component={About}  />
            <Route path='/profile' component={Profile} />
            <Route path='/install' component={Install} />

            <Route path='/api/share' component={Share} />
            <Route path='/api/vibrate' component={Virate} />
            <Route path='/api/media-session' component={MediaSession} />
            <Route path='/api/fullscreen' component={FullScreen} />
            <Route path='/api/screen-no-sleep' component={ScreenNoSleep} />
          </Switch>
        </div>

        {/* <img alt='ddd' src={logo192} /> */}
        {/* <img alt='ddd' src={logo512} /> */}
      </Router>
    </div>
  );
}

export default App;
