/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { callApi } from '../redux/actions/remoteData';
import { uiStatusHide } from '../redux/actions/ui';

import Menu from './Menu';
import Status from './Status';

const makeSelectorFunction = () => (state, categoryId) => state.postsDataState[categoryId];

const List = ({ categoryId }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  const dispatch = useDispatch();

  const selectorFunctionWithMemo = useMemo(makeSelectorFunction, []);
  const posts = useSelector((state) => selectorFunctionWithMemo(state, selectedCategoryId), shallowEqual);

  useEffect(() => {
    console.log('<List> mounted');
  }, []);

  useEffect(() => {
    console.log('<List> rendered -------------------------------->');
  });

  useEffect(() => {
    console.log('<List> selectedCategoryId changed');

    dispatch(uiStatusHide());

    if (typeof posts === 'undefined') {
      console.log('Data does not exist in postsDataState... calling API');
      dispatch(callApi({ categoryId: selectedCategoryId }));
    }
  }, [selectedCategoryId]);

  function getSliceOfIDs({ ids, from, to }) {
    return ids.slice(from, to);
  }

  const onSelectCategory = useCallback((id) => {
    setSelectedCategoryId(id);
  }, []);

  return (
    <div className="list">
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
