/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// ----------------------------------------------------------------------------------
//
// FadeOverContainer
//
// This example makes it possible to fade-in a new element on top of a previous element
// with a transparency effect. The height of the elements can vary.
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
    // 2. After the re-render, caused by handleSwitch(), the overlay rendered the new selected item, which
    // begins to play its fade in transition. The backgound rendered the previous item, but its height
    // needs to be resized to match the new selected item. The fade and height transitions have to occur at
    // the same time. To do this, we get the new overlay item height and update the state.
    // The state change will cause another re-render and force the background item to have the
    // same height as the overlay item.
    setSelectedItemHeight(selectedItemRef.current.getBoundingClientRect().height);
  }, [selectedItem]);

  function handleSwitch(id) {
    // 1. On switch, the background item is first updated to render the previous overlay item.
    // Then we set the next overlay item, which will cause a re-render.
    backgroundItem.current = selectedItem;
    setSelectedItem(items.find((item) => item.id === id));
  }

  return (
    <div className="switch-container">
      <div className="switch-container__item">
        <button className="button" type="button" onClick={() => handleSwitch(1)}>Index</button>
        <button className="button" type="button" onClick={() => handleSwitch(2)}>Articles</button>
        <button className="button" type="button" onClick={() => handleSwitch(3)}>Dashboard</button>
      </div>
      <div className="switch-container__item-wrapper">
        <CSSTransition
          key={selectedItem.id}
          in
          appear
          timeout={300}
          classNames="fade"
        >
          {/* The selected item fades in on top of the previous item to get a transparency effect. */}
          <div ref={selectedItemRef} className="switch-container__item-overlay">
            {/* In this example, the transition switches out the 'same' component <Item>, just updating
            its content. A transition can also switch out 'different' components. */}
            <Item title={selectedItem.title} text={selectedItem.text} />
          </div>
        </CSSTransition>
        {/* The previous item is placed underneath the selected item and is resized
        to force the same height as the selected item. During the first render, the
        selectedItemHeight state is not set yet, so we set height = auto since both the selected
        item in the overlay and the previous item in the background are equal and have the same
        height anyway. */}
        <div className="switch-container__item" style={{ height: selectedItemHeight ? `${selectedItemHeight}px` : 'auto' }}>
          <Item title={backgroundItem.current.title} text={backgroundItem.current.text} />
        </div>
      </div>
    </div>
  );
};

export default FadeOverContainer;
