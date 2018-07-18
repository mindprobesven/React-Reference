import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 1000);
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 1000);
  }
};

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <ul className="nav-list">
        <li><Link to={'/public'}>Public page</Link></li>
        <li><Link to={'/protected'}>Protected page</Link></li>
      </ul>

      <hr />

      <Route path={'/public'} component={Public} />
      <Route path={'/login'} component={Login} />
      <PrivateRoute path={'/protected'} component={Protected} />
    </div>
  </Router>
);

const AuthButton = withRouter(({ history }) => 
  fakeAuth.isAuthenticated ? ( 
    <div>
      <h3>Welcome!</h3>
      <button onClick={() => fakeAuth.signout(() => history.push("/"))}>Sign Out!</button>
    </div>
  ) : ( 
    <div>
      <h3>You are not logged in!</h3>
    </div>
  )
);

const Public = () => <h3>Public page content.</h3>;
const Protected = () => <h3>Protected page content.</h3>;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => 
    fakeAuth.isAuthenticated ? 
      (
        <Component {...props} />
      ) : (
        <Redirect 
          to={
            {
              pathname: "/login",
              state: { from: props.location }
            }
          } 
        />
      )
    } 
  />
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  login = () => {
    const { redirectToReferrer } = this.state;

    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if(redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must login to view page {from.pathname}</p>
        <button onClick={this.login}>Login !</button>
      </div>
    )
  }
}

export default AuthExample;