import * as React from 'react'
import { Component } from 'react'

import VariableCellHeight from '../list/VariableCellHeight';
import StaticSizeList from '../list/StaticSizeList';
import AutoSizerList from '../list/AutoSizerList';
import WindowScrollerList from '../list/WindowScrollerList';
import WindowScrollerHeaderList from '../list/WindowScrollerHeaderList';
import InfinityLoaderList from '../list/InfinityLoaderList';
import WindowVariableCellHeight from '../list/WindowVariableCellHeight';

class App extends Component {
  render() {
    return (
      <WindowVariableCellHeight />
    )
  }
}

/*
<StaticSizeList />
<AutoSizerList />
<VariableCellHeight />
<WindowScrollerList />
<WindowScrollerHeaderList />
<WindowVariableCellHeight />
<InfinityLoaderList />
*/

export default App