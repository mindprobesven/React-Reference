// import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './styles/base.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Public from './components/Public';
import Protected from './components/Protected';
import AuthProvider from './contexts/AuthProvider';
import AuthButton from './components/AuthButton';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div>
            <AuthButton />
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/public">Public</Link>
              </li>
              <li>
                <Link to="/protected">Protected</Link>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/public">
                <Public />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <ProtectedRoute path="/protected">
                <Protected />
              </ProtectedRoute>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
