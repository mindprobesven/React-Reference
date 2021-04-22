/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './Home';
import About from './About';
import Dashboard from './Dashboard';

const RoutesWithTransition = () => {
  console.log('RoutesWithTransition');

  const location = useLocation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.key}
        appear
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames="switch"
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
    </SwitchTransition>
  );
};

/* <TransitionGroup component={null}>
    <CSSTransition
      key={location.key}
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
  </TransitionGroup> */

export default RoutesWithTransition;
