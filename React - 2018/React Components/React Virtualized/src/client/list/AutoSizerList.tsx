import * as React from 'react'
import { Component} from 'react'
import { AutoSizer ,List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import './AutoSizerList.scss'

let list: string[] = []

const generateList = () => {
  for(let i: number = 0; i <= 50; i++) {
    list = [...list, `Lorem ipsum dolor.`]
  }
  return list
}

const Item = ({itemId, content}: any) => {
  return (
    <div className="two-column-container">
      <div className="left-column-container">
        <div className="content">
          {itemId}
        </div>
      </div>
      <div className="right-column-container">
        <div className="content">
          {content}
        </div>
      </div>
    </div>
  )
}

export default class AutoSizerList extends Component {
  private _listElement: any
  
  componentWillMount() {
    generateList()
  }

  _noRowsRenderer = () => {
    return (
      <div className="noRows">We got an empty list</div>
    )
  }

  _rowRenderer = ({
    key,
    index,
    isScrolling,
    isVisible,
    style
  }: any) => {
    const content = <Item itemId={index} content={list[index]} />

    return (
      <div 
        className="item-container"
        key={key} 
        style={style}
      >
        {content}
      </div>
    )
  }

  _onScroll = ({
    clientHeight,
    scrollHeight,
    scrollTop
  }: any) => {
    /*
    console.log('clientHeight: ' + clientHeight)
    console.log('scrollHeight: ' + scrollHeight)
    console.log('scrollTop: ' + scrollTop)
    */
  }

  _scrollToRow = () => {
    this._listElement.scrollToRow(25)
  }

  _scrollToTop = () => {
    this._listElement.scrollToRow(0)
  }

  _scrollToPosition = () => {
    this._listElement.scrollToPosition(20)
  }

  _getOffsetForRow = () => {
    console.log(this._listElement.getOffsetForRow({ alignment: 'start', index: 1 }))
  }

  render() {
    return (
      <div className="wrapper">
        <div className="auto-size-list-container">
          <button onClick={this._scrollToRow} style={{padding: '10px', marginRight: '10px'}}>Scroll to 25</button>
          <button onClick={this._scrollToTop} style={{padding: '10px', marginRight: '10px'}}>Scroll to top</button>
          <button onClick={this._scrollToPosition} style={{padding: '10px', marginRight: '10px'}}>Scroll to position</button>
          <button onClick={this._getOffsetForRow} style={{padding: '10px', marginRight: '10px'}}>Offset for row #1</button>
          <AutoSizer>
            {({height, width}) => {
              return <List 
                className="auto-size-list"
                ref={element => this._listElement = element}
                width={width}
                height={height}
                overscanRowCount={5}
                scrollToAlignment={'start'}
                rowCount={list.length}
                rowHeight={50}
                noRowsRenderer={this._noRowsRenderer}
                rowRenderer={this._rowRenderer}
                onScroll={this._onScroll}
              />
            }}
          </AutoSizer>
        </div>  
      </div>
    )
  }
}