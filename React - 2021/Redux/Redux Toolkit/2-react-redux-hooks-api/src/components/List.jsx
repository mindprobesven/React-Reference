/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/*
----------------------------------------------------------------------------------
useDispatch()

- This hook returns a reference to the dispatch function from the Redux store

----------------------------------------------------------------------------------
*/
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { callApi } from '../redux/actions/remoteData';
import { uiStatusHide } from '../redux/actions/ui';

import Menu from './Menu';
import Status from './Status';

const makeSelectorFunction = () => (state, categoryId) => state.postsDataState[categoryId];

const List = ({ categoryId }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  // Instantiate dispatch with useDispatch()
  const dispatch = useDispatch();

  const selectorFunctionWithMemo = useMemo(makeSelectorFunction, []);
  const posts = useSelector((state) => selectorFunctionWithMemo(state, selectedCategoryId), shallowEqual);

  useEffect(() => {
    console.log('<List> mounted');
  }, []);

  useEffect(() => {
    // console.log('<List> rendered -------------------------------->');
  });

  useEffect(() => {
    console.log('<List> selectedCategoryId changed');

    // Dispatching an action with useDispatch()
    dispatch(uiStatusHide());

    if (typeof posts === 'undefined') {
      console.log('Data does not exist in postsDataState... calling API');
      // Dispatching an action with useDispatch()
      dispatch(callApi({ categoryId: selectedCategoryId }));
    }
  }, [selectedCategoryId]);

  function getSliceOfIDs({ ids, from, to }) {
    return ids.slice(from, to);
  }

  // Memoized with useCallback()
  const onSelectCategory = useCallback((id) => {
    setSelectedCategoryId(id);
  }, []);

  return (
    <div className="list">
      {/*
      [OPTIMIZATION]
      The <Menu> component is trying to optimize its render behavior using React.memo()
      However, a callback (onSelectCategory) is being passed to this child component.
      This is a problem, because whenever this parent component re-renders, a new callback
      reference is passed to the child component, forcing it to re-render.
      Therefore, it is important to memoize this callback with useCallback().
      */}
      <Menu selectCategory={onSelectCategory} />
      <Status />
      {
        !posts && (
          <div className="list__item">
            <div className="list__text">
              <p>Loading...</p>
            </div>
          </div>
        )
      }
      {
        posts && getSliceOfIDs({
          ids: posts.allIDs,
          from: 0,
          to: 10,
        }).map((id) => (
          <div key={id} className="list__item">
            <div className="list__text">
              <p>{posts.byID[id].title}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default List;
