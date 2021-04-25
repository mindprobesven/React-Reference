/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// ----------------------------------------------------------------------------------
//
// Route switching with transition
//
// ----------------------------------------------------------------------------------

import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './Home';
import About from './About';
import Dashboard from './Dashboard';

const RoutesWithTransition = () => {
  console.log('RoutesWithTransition');

  const location = useLocation();

  // This version uses <SwitchTransition>. On switch, the old route transitions out
  // and after the new route transitions in (mode="out-in"). This is accomplished by
  // updating the key of <CSSTransition> when the location.pathname changes.
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        appear
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames="switch"
      >
        {/* It is necessary to specify the location in <Switch> because it is used
        inside a wrapper component <RoutesWithTransition> */}
        <Switch location={location}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </CSSTransition>
    </SwitchTransition>
  );

  // This version uses <TransitionGroup>. On switch, the old route unmounts immediately
  // and the new route transitions in. This is accomplished by updating the key of
  // <CSSTransition> when the location.pathname changes.
  /* return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        appear
        timeout={300}
        classNames="fade"
      >
        <Switch location={location}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ); */
};

export default RoutesWithTransition;
