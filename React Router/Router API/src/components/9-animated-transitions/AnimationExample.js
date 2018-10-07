import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './AnimationExample.scss';

const AnimationExample = () => (
  <Router>
    <Route render={({ location }) => {
      console.log(location);

      return (
        <div className="container">
          <Route exact path="/" render={() => <Redirect to="/hsl/10/90/50" />} />

          <ul className="nav">
            <NavLink to="/hsl/10/90/50">Red</NavLink>
            <NavLink to="/hsl/120/100/40">Green</NavLink>
            <NavLink to="/rgb/33/150/243">Blue</NavLink>
            <NavLink to="/rgb/240/98/146">Pink</NavLink>
          </ul>
          
          <div className="content">
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route exact path={"/hsl/:h/:s/:l"} component={HSL} />
                <Route exact path={"/rgb/:r/:g/:b"} component={RGB} />
              </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      )
    }} />
  </Router>
);

const NavLink = props => (
  <li>
    <Link {...props} />
  </li>
);

const HSL = ({ match: { params } }) => { 
  return (
   <div className="hsl" style={{
     background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
   }}>
     {`HSL - ${params.h} - ${params.s} - ${params.l}`}
   </div> 
  )
};

const RGB = ({ match: { params } }) => {
  return (
   <div className="rgb" style={{
     background: `rgb(${params.r}, ${params.g}, ${params.b})`
   }}>
     {`RGB - ${params.r} - ${params.g} - ${params.b}`}
   </div> 
  )
};

export default AnimationExample;