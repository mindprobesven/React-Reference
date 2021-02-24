// import { hot } from 'react-hot-loader/root';
import React from 'react';

import './styles/base.scss';

import ChatBox from './components/chat/ChatBox';

const App = () => (
  <div className="app">
    <ChatBox />
  </div>
);

// export default hot(App);
export default App;
