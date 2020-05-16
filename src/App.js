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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to='/' >Home</Link>
          <Link to='/about' >About</Link>
        </div>

        <div>
          <Switch>
            <Route path='/' exact component={Home}  />
            <Route path='/about' exact component={About}  />
          </Switch>
        </div>

        <img alt='ddd' src={logo192} />
        {/* <img alt='ddd' src={logo512} /> */}
      </Router>
    </div>
  );
}

export default App;
