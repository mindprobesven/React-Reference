/* eslint-disable react/jsx-pascal-case */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// ----------------------------------------------------------------------------------
//
// SwitchTransition
//
// <SwitchTransition> makes it possible to transitionally switch between 'different' components or
// using the 'same' component when its content changes. The transition switch occurs when
// the key of the <CSSTransition> component is changed.
//
// If the out-in mode is selected, the SwitchTransition waits until the old child leaves
// and then inserts a new child. If the in-out mode is selected, the SwitchTransition
// inserts a new child first, waits for the new child to enter and then removes the old child.
//
// ----------------------------------------------------------------------------------

import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const Articles = ({ title }) => (
  <>
    <div className="list__item">
      <div className="list__text">
        <p>{title}</p>
      </div>
    </div>
  </>
);

const Dashboard = ({ title }) => (
  <>
    <div className="list__item">
      <div className="list__text">
        <p>{title}</p>
      </div>
    </div>
  </>
);

const Index = ({ title }) => (
  <>
    <div className="list__item">
      <div className="list__text">
        <p>{title}</p>
      </div>
    </div>
  </>
);

const items = [
  { id: 1, title: 'Index Tab', component: Index },
  { id: 2, title: 'Articles Tab', component: Articles },
  { id: 3, title: 'Dashboard Tab', component: Dashboard },
];

const SwitchTransitionMethods = () => {
  console.log('SwitchTransitionMethods');

  const [SelectedItem, setSelectedItem] = useState(items[0]);

  function handleChange(id) {
    setSelectedItem(items.find((item) => item.id === id));
  }

  return (
    <div className="list">
      <div className="list__item">
        <button className="button" type="button" onClick={() => handleChange(1)}>Index</button>
        <button className="button" type="button" onClick={() => handleChange(2)}>Articles</button>
        <button className="button" type="button" onClick={() => handleChange(3)}>Dashboard</button>
      </div>
      {/* Mode can be out-in or in-out */}
      <SwitchTransition mode="out-in">
        <CSSTransition
          // A key change cause the transition switch to occur
          key={SelectedItem.id}
          appear
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames="fade"
        >
          {/* In this example, the transition switches between different components.
          However, it is possible to use the same component and just update its content.
          For example, when using the same content container component and only changing its content.
          The switch is triggered when <CSSTransition> receives a key change. */}
          <SelectedItem.component title={SelectedItem.title} />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default SwitchTransitionMethods;
