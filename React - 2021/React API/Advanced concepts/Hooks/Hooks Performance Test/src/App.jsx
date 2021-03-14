/* eslint-disable max-len */
// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';
// import './CounterWithHOC/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import CounterList from './components/CounterList';

import CounterBox from './CounterWithHOC/CounterBox';
import CounterListWithHOC from './CounterlistWithHOC/CounterListWithHOC';
import CounterData from './CounterlistWithRenderProps/CounterData';
import CounterListHooks from './CounterlistHooks/CounterListHooks';
import CounterStore, { CounterContext } from './contexts/CounterStore';
import CounterListHooksContext from './CounterlistHooksWithContext/CounterListHooksContext';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      {/* Hooks with Context */}
      <CounterStore>
        <CounterListHooksContext />
      </CounterStore>

      {/* Context */}
      <CounterStore>
        <CounterContext.Consumer>
          {
            (value) => (
              <CounterList
                counters={value.counters}
                handleIncrement={value.handleIncrement}
              />
            )
          }
        </CounterContext.Consumer>
      </CounterStore>

      {/* Custom Hook */}
      <CounterListHooks />

      {/* HOC */}
      <CounterListWithHOC />

      {/* Render Props */}
      <CounterData render={(counterData) => (
        <CounterList
          counters={counterData.counters}
          handleIncrement={counterData.handleIncrement}
        />
      )}
      />

      <div className="counter-list-container">
        <CounterBox counterID={1} />
        <CounterBox counterID={2} />
      </div>
    </ErrorBoundary>
  </div>
);

// export default hot(App);
export default App;
