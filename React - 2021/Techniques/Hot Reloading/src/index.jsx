/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // console.log('Hot');
  module.hot.accept('./App', () => {
    console.log('----------------> Caught in index');
    // store.replaceReducer(rootReducer);
    render(App);
  });
  // module.hot.accept();
  // module.hot.accept(() => console.log('----------------> Caught in App'));
  // module.hot.accept('./App', () => console.log('----------------> Caught in App'));
  // module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
}

/* ReactDOM.render(
  <App />,
  document.getElementById('root'),
); */
