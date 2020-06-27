import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RouteLoader from './components/RouteLoader';
import logo512 from './images/logo512.png'
import logo192 from './images/logo192.png'

const Home = RouteLoader(React.lazy(() => import('./pages/others/Home')))
const About = RouteLoader(React.lazy(() => import('./pages/others/About')))
const Profile = RouteLoader(React.lazy(() => import('./pages/others/Profile')))

const Install = RouteLoader(React.lazy(() => import('./pages/apis/Install')))
const Share = RouteLoader(React.lazy(() => import('./pages/apis/Share')))
const Virate = RouteLoader(React.lazy(() => import('./pages/apis/Virate')))
const MediaSession = RouteLoader(React.lazy(() => import('./pages/apis/MediaSession')))
const FullScreen = RouteLoader(React.lazy(() => import('./pages/apis/FullScreen')))
const ScreenNoSleep = RouteLoader(React.lazy(() => import('./pages/apis/NoSleep')))
const WakeLock = RouteLoader(React.lazy(() => import('./pages/apis/WakeLock')))
const Notifications = RouteLoader(React.lazy(() => import('./pages/apis/Notifications')))
const PushNotifications = RouteLoader(React.lazy(() => import('./pages/apis/PushNotifications')))
const TextFragments = RouteLoader(React.lazy(() => import('./pages/apis/TextFragments')))
const IdleDetector = RouteLoader(React.lazy(() => import('./pages/apis/IdleDetector')))
const UserMedia = RouteLoader(React.lazy(() => import('./pages/apis/UserMedia')))
const ScreenMedia = RouteLoader(React.lazy(() => import('./pages/apis/ScreenMedia')))
const Contacts = RouteLoader(React.lazy(() => import('./pages/apis/Contacts')))
const Clipboard = RouteLoader(React.lazy(() => import('./pages/apis/Clipboard')))
const PaymentRequest = RouteLoader(React.lazy(() => import('./pages/apis/PaymentRequest')))
const Call = RouteLoader(React.lazy(() => import('./pages/apis/Call')))

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path='/' exact component={Home}  />
            <Route path='/about' exact component={About}  />
            <Route path='/profile' component={Profile} />

            <Route path='/api/install' component={Install} />
            <Route path='/api/share' component={Share} />
            <Route path='/api/vibrate' component={Virate} />
            <Route path='/api/media-session' component={MediaSession} />
            <Route path='/api/fullscreen' component={FullScreen} />
            <Route path='/api/screen-no-sleep' component={ScreenNoSleep} />
            <Route path='/api/wakelock' component={WakeLock} />
            <Route path='/api/notifications' component={Notifications} />
            <Route path='/api/push-notifications' component={PushNotifications} />
            <Route path='/api/text-fragments' component={TextFragments} />
            <Route path='/api/idle-detector' component={IdleDetector} />
            <Route path='/api/user-media' component={UserMedia} />
            <Route path='/api/screen-media' component={ScreenMedia} />
            <Route path='/api/contacts' component={Contacts} />
            <Route path='/api/clipboard' component={Clipboard} />
            <Route path='/api/payment-request' component={PaymentRequest} />
            <Route path='/api/call' component={Call} />
            <Route component={Home} />
          </Switch>
        </div>

        {/* <img alt='ddd' src={logo192} /> */}
        {/* <img alt='ddd' src={logo512} /> */}
      </Router>
    </div>
  );
}

export default App;
