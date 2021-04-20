/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
// ----------------------------------------------------------------------------------
//
// TransitionGroup component
//
// The <TransitionGroup> component manages a 'set' of <CSSTransition> components in a 'list'.
// <TransitionGroup> is a state machine for managing the mounting and unmounting
// of <CSSTransition> components over time. A set of <CSSTransition> components are toggled in and out
// as they leave. The <TransitionGroup> will inject the specific transition props (in, etc.) into
// the <CSSTransition> components.
//
// ----------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

const articles = [
  { id: uuid(), title: 'Title 1', exitTransition: true },
  { id: uuid(), title: 'Title 2', exitTransition: true },
  { id: uuid(), title: 'Title 3', exitTransition: true },
];

const ListText = ({ title }) => (
  <div className="list__text">
    <p>{title}</p>
  </div>
);

const TransitionGroupMethods = () => {
  const [items, setItems] = useState(articles);
  const [isUpdate, setIsUpdate] = useState(false);

  // useEffect catches isUpdate when an item was edited. It then replaces the old child with the new child.
  // The new child has a different ID, which is used as the key prob for <CSSTransition>. The key change causes the
  // <TransitionGroup> to transition the old child out and the new child in.
  // The data for the new child is stored in 'replaceWithItem' by handleEdit(). handleEdit() also took care of
  // disabling the exit transition of the old child.
  useEffect(() => {
    if (isUpdate) {
      console.log('An item was updated!');

      setIsUpdate(false);

      const itemsWithReplacement = items.map((item) => {
        if (item.replaceWithItem) {
          console.log(item);
          return item.replaceWithItem;
        }
        return item;
      });
      setItems(itemsWithReplacement);
    }
  }, [items, isUpdate]);

  function handleRemove(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  // Replacing one item with another 'in place' and having the new item transition in.
  //
  // The trick to accomplish this, is changing the key prop of a <CSSTransition> child.
  // It will cause the <TransitionGroup> to transition the old child out and the new child in.
  //
  // The child being replaced should disappear immediately and not have an exit transition,
  // it has to be disabled somehow.
  // This crazy code can disable the exit transition on a <CSSTransition>, 'before' it is replaced.
  function handleEdit(id) {
    const itemsWithDisabledExit = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          // The exit transition is disabled for the item to be replaced.
          exitTransition: false,
          // useEffect will replace the old item in the array with this one. It contains a different
          // ID, which is used as key by <CSSTransition>. The key change causes the transition to take place.
          replaceWithItem: { id: uuid(), title: 'Title updated', exitTransition: true },
        };
      }
      return item;
    });
    setItems(itemsWithDisabledExit);
    setIsUpdate(true);
  }

  const itemsList = items.map((item) => (
    // A set of <CSSTransition> components must be rendered as children of the <TransitionGroup> component.
    <CSSTransition
      // <TransitionGroup> uses the 'key' prop as the identifier for each <CSSTransition> component to pass (in, etc)
      key={item.id}
      appear
      timeout={300}
      classNames="fade"
      enter
      // The exit transition plays when clicking the Toggle button, but not when the item is replaced (Edit button).
      exit={item.exitTransition}
      onExit={() => console.log('onExit', item.id)}
      onEnter={() => console.log('onEnter', item.id)}
      onEntering={() => console.log('onEntering', item.id)}
      onEntered={() => console.log('onEntered', item.id)}
      onExiting={() => console.log('onExiting', item.id)}
      onExited={() => console.log('onExited', item.id)}
    >
      <div className="list__item">
        <ListText title={item.title} />
        <button
          className="button"
          type="button"
          onClick={() => handleEdit(item.id)}
        >
          Edit
        </button>
        <button
          className="button"
          type="button"
          onClick={() => handleRemove(item.id)}
        >
          Toggle
        </button>
      </div>
    </CSSTransition>
  ));

  return (
    // The <TransitionGroup> component renders a <div> by default.
    // Here the original <div> container with className="list" is replaced
    // with a <TransitionGroup> component.
    <TransitionGroup className="list">
      {itemsList}
    </TransitionGroup>
  );
};

export default TransitionGroupMethods;
