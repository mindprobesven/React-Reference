/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/*
---------------------------------------------------------------------------------------------------
useSelector()

const result: any = useSelector(selector: Function, equalityFn?: Function)

- Allows you to extract data from the Redux store state, using a 'selector function'.
- Approximate equivalent to mapStateToProps.
- useSelector() runs when a component renders and whenever an action is dispatched to
the Redux store.
- Whenever useSelector() runs, it calls the provided selector function. The result returned
by the selector function is then 'compared' with the previous result. If the selector result
appears to be different than the last result, useSelector() will force a re-render.
- By default comparison is strict === reference comparison. To enable shallow equality check,
Use the 'shallowEqual' function from react-redux as the equalityFn argument to useSelector().
It compares two arbitrary values for shallow equality. Object values are compared based on
their keys, i.e. they must have the same keys and for each key the value must be equal.

[IMPORTANT]
To avoid unnecessary re-renders when using useSelector(), use the following techniques;
- Use a selector function reference, here selectorFunction()
- The selector function must return a single field value to achieve optimal equality comparision
between previous and next renders.
- Use 'shallowEqual' as the equalityFn argument to useSelector() to enable shallow equality
comparision, instead of the default strict === comparison.

[CAUTION]
When using useSelector() with an inline selector function, a new instace of the selector
is created whenever the component is rendered.

Example: This inline selector function will create a new instance of the selector whenever the component
is rendered. Not good!
const statusBar = useSelector((state) => state.uiState.components.statusBar, shallowEqual);

[SOLUTION]
Use a selector function reference. A cached result may be returned by the hook without re-running the
selector if it's the same function reference as on a previous render of the component.
Example:
const statusBar = useSelector(selectorFunction, shallowEqual);
---------------------------------------------------------------------------------------------------
*/
import React, { useEffect, useMemo, memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

// A maker function that returns a selector function.
const makeSelectorFunction = () => (state, optionalComponentProp) => state.uiState.components.statusBar;

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
  Example
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
const selectorFunction = (state, optionalComponentProp) => state.uiState.components.statusBar;

const Status = memo(() => {
  /*
  [METHOD]
  Passing additional data (for example component props) to the selector function.

  When the selector is used in multiple component instances and depends on the component's props, you
  need to ensure that each component instance gets its own selector instance using useMemo() and a maker
  function that returns a selector function.
  */
  const selectorFunctionWithMemo = useMemo(makeSelectorFunction, []);
  const statusBar = useSelector((state) => selectorFunctionWithMemo(state, 'optionalComponentProp'), shallowEqual);

  const {
    isShowing,
    status,
    message,
    error,
  } = statusBar;

  useEffect(() => {
    console.log('<Status> mounted');
  }, []);

  useEffect(() => {
    // console.log('<Status> rendered -------------------------------->');
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
});

export default Status;
