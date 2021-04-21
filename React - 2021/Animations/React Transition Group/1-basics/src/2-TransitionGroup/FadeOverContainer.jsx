/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// ----------------------------------------------------------------------------------
//
// SwitchTransition
//
// ----------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const Item = ({ title, text }) => (
  <div className="switch-container__text">
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

const items = [
  { id: 1, title: 'Index Tab', text: 'A transition component inspired by the vue transition modes. You can use it when you want to control the render between state transitions.' },
  { id: 2, title: 'Articles Tab', text: 'Some text' },
  { id: 3, title: 'Dashboard Tab', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at libero et odio efficitur accumsan. Morbi at molestie lacus. Nullam metus neque, accumsan id magna eu, sodales tempus arcu. Mauris non lacus eget arcu finibus maximus a eu est. Cras condimentum varius ligula et commodo. Nulla id tincidunt massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at libero et odio efficitur accumsan. Morbi at molestie lacus. Nullam metus neque, accumsan id magna eu, sodales tempus arcu. Mauris non lacus eget arcu finibus maximus a eu est. Cras condimentum varius ligula et commodo. Nulla id tincidunt massa.' },
];

const FadeOverContainer = () => {
  console.log('FadeOverContainer');

  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [selectedItemHeight, setSelectedItemHeight] = useState();

  const selectedItemRef = useRef();
  const backgroundItem = useRef(items[0]);

  useEffect(() => {
    console.log('Update');
    // After a render, we grab the overlay item height and update the state.
    // This will cause a re-render and force the background item to have the
    // same height as the overlay item.
    setSelectedItemHeight(selectedItemRef.current.getBoundingClientRect().height);
  }, [selectedItem]);

  function handleChange(id) {
    // On change, first backgroundItem is updated to render the last overlay item.
    backgroundItem.current = selectedItem;
    // Then we set the new overlay item, which will cause a re-render.
    setSelectedItem(items.find((item) => item.id === id));
  }

  return (
    <div className="switch-container">
      <div className="switch-container__item">
        <button className="button" type="button" onClick={() => handleChange(1)}>Index</button>
        <button className="button" type="button" onClick={() => handleChange(2)}>Articles</button>
        <button className="button" type="button" onClick={() => handleChange(3)}>Dashboard</button>
      </div>
      <div className="wrapper">
        <CSSTransition
          key={selectedItem.id}
          in
          appear
          timeout={300}
          classNames="fade"
        >
          <div ref={selectedItemRef} className="switch-container__item-overlay">
            <Item title={selectedItem.title} text={selectedItem.text} />
          </div>
        </CSSTransition>
        <div className="switch-container__item" style={{ height: selectedItemHeight ? `${selectedItemHeight}px` : 'auto' }}>
          <Item title={backgroundItem.current.title} text={backgroundItem.current.text} />
        </div>
      </div>
    </div>
  );
};

export default FadeOverContainer;
