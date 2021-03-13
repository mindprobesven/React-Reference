// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';
import './CounterWithHOC/style.scss';

import ErrorBoundary from './components/ErrorBoundary';
import CounterBox from './CounterWithHOC/CounterBox';
import CounterListWithHOC from './CounterlistWithHOC/CounterListWithHOC';
import CounterData from './CounterlistWithRenderProps/CounterData';
import CounterList from './CounterlistWithHOC/CounterList';
import CounterListHooks from './CounterlistHooks/CounterListHooks';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <CounterListHooks />

      <CounterListWithHOC />

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
