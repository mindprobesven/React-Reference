/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { connect, shallowEqual, useSelector } from 'react-redux';

const makeSelectorFunction = () => (state, optionalComponentProp) => {
  console.log('Selector updated');
  console.log(optionalComponentProp);

  return state.uiState.components.statusBar;
};

// Instead of inlining the selector
const selectorFunction = (state, optionalComponentProp) => {
  console.log('Selector updated');
  console.log(optionalComponentProp);

  /*
  Selector function

  ---------------------------------------------------------------------------------------------------
  [CAUTION]
  With mapState, all individual fields were returned in a 'combined object'.
  It didn't matter if the return object was a new reference or not - connect()
  just compared the individual fields.

  With useSelector(), returning a new object every time will always force a re-render
  by default. That' because useSelector() uses strict === reference equality checks
  by default, not shallow equality.

  Therefore, this would force a re-render because a new object is returned every time.
  return { state.uiState.components.statusBar };

  [SOLUTION]
  Return a single field value which can be checked for strict === reference equality.
  return state.uiState.components.statusBar;

  [BETTER SOLUTION]
  Use the 'shallowEqual' function from React-Redux as the equalityFn argument to useSelector().
  It compares two arbitrary values for shallow equality. Object values are compared based on
  their keys, i.e. they must have the same keys and for each key the value must be equal
  ---------------------------------------------------------------------------------------------------
  */

  return state.uiState.components.statusBar;
};

const Status = () => {
  /*
  useSelector() - Best practices for highest performance

  - Approximate equivalent to mapStateToProps.
  - Called with the entire Redux store state as its only argument.
  - When an action is dispatched, useSelector() will do a reference comparison of the previous
  selector function result value and the current result value. If they are different, the component will
  be forced to re-render. If they are the same, the component will not re-render.
  - Also subscribes to the Redux store and runs the selector whenever an action is dispatched.

  [IMPORTANT]
  To avoid unnecessary re-renders when using useSelector(), use the following techniques;
  - Use a selector function reference, here selectorFunction()
  - The selector function must return a single field value to achieve optimal equality comparision
  between previous and next renders.
  - Use 'shallowEqual' as the equalityFn argument to useSelector() to enable shallow equality
  comparision, instead of the default strict === comparison.

  ---------------------------------------------------------------------------------------------------
  [CAUTION]
  When using useSelector() with an inline selector function, a new instace of the selector
  is created whenever the component is rendered. This inline selector function will create a new instance
  of the selector whenever the component is rendered!
  const statusBar = useSelector((state) => {
    console.log('Selector updated');
    return state.uiState.components.statusBar;
  });

  [SOLUTION]
  Use a selector function reference. A cached result may be returned by the hook without re-running the
  selector if it's the same function reference as on a previous render of the component.
  const statusBar = useSelector(selectorFunction);
  ---------------------------------------------------------------------------------------------------
  */

  // 'shallowEqual' is used here as the equalityFn argument to useSelector()
  // const statusBar = useSelector(selectorFunction, shallowEqual);

  // This would be the way to pass additional data to the selector function.
  const selectorFunctionWithMemo = useMemo(makeSelectorFunction, []);
  const statusBar = useSelector((state) => selectorFunctionWithMemo(state, 'optionalComponentProp'), shallowEqual);

  const {
    isShowing,
    status,
    message,
    error,
  } = statusBar;

  console.log(isShowing);

  useEffect(() => {
    console.log('<Status> mounted');
  }, []);

  useEffect(() => {
    console.log('<Status> rendered -------------------------------->');
  });

  if (!isShowing) {
    return null;
  }

  if (status === 'ERROR') {
    return (
      <div className="status status--red">
        <p>{`${error.name}: ${error.message}`}</p>
      </div>
    );
  }
  if (status === 'SUCCESS') {
    return (
      <div className="status status--green">
        <p>{message}</p>
      </div>
    );
  }
  return null;
};

export default Status;
