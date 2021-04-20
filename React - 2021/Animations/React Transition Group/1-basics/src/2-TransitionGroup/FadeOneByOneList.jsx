/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
// ----------------------------------------------------------------------------------
//
// TransitionGroup component
//
//
// ----------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

const articles = [
  { id: 1, title: 'Title 1', transitionKey: uuid() },
  { id: 2, title: 'Title 2', transitionKey: uuid() },
  { id: 3, title: 'Title 3', transitionKey: uuid() },
];

const ListText = ({ title }) => (
  <div className="list__text">
    <p>{title}</p>
  </div>
);

const FadeOneByOneList = () => {
  console.log('FadeOneByOneList');

  const [items, setItems] = useState([]);

  let intervalID;
  const total = articles.length;
  let counter = 0;

  useEffect(() => {
    console.log('Mounted');

    if (!intervalID) {
      console.log('Starting interval...');
      intervalID = setInterval(() => {
        console.log('interval');
        if (counter < total) {
          console.log('Adding item to array');
          setItems((prevItems) => [...prevItems, articles[counter]]);
          counter += 1;
        } else if (counter === total) {
          clearInterval(intervalID);
        }
      }, 150);
    }
    // Missing the unmount clearInterval(intervalID) return
  }, []);

  const itemsList = items.map((item) => (
    <CSSTransition
      key={item.transitionKey}
      appear
      timeout={300}
      classNames="fade"
      enter
      exit
      onEntered={() => console.log('onEntered', item.id)}
    >
      <div className="list__item">
        <ListText title={item.title} />
        <button
          className="button"
          type="button"
        >
          Open
        </button>
      </div>
    </CSSTransition>
  ));

  return (
    <TransitionGroup className="list">
      {itemsList}
    </TransitionGroup>
  );
};

export default FadeOneByOneList;
