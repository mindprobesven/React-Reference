/* eslint-disable react/prop-types */
/* eslint-disable max-len */
// ----------------------------------------------------------------------------------
//
// FadeSequenceList
//
// This example shows how to transition (fade-in) all items of a list in sequence one by one.
// This is accomplished by adding the items of a list one by one to the 'items' state array using
// setInterval. The <TransitionGroup> will mount the new items and play the 'enter' transition.
//
// ----------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const articles = [
  { id: 1, title: 'Title 1' },
  { id: 2, title: 'Title 2' },
  { id: 3, title: 'Title 3' },
];

const ListText = ({ title }) => (
  <div className="list__text">
    <p>{title}</p>
  </div>
);

const FadeSequenceList = () => {
  console.log('FadeSequenceList');

  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('Mounted');

    const total = articles.length;
    let intervalID;
    let counter = 0;

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
      key={item.id}
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

export default FadeSequenceList;
