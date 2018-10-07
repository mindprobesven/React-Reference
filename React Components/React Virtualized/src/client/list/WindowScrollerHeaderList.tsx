import * as React from 'react'
import { Component} from 'react'
import { WindowScroller, AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import './WindowScrollerHeaderList.scss'

let list: string[] = []

const generateList = () => {
  for(let i: number = 0; i <= 5000; i++) {
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

export default class WindowScrollerHeaderList extends Component {
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
    this._listElement.scrollToRow(2500)
  }

  _scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  _scrollToPosition = () => {
    this._listElement.scrollToPosition(20)
  }

  _getOffsetForRow = () => {
    console.log(this._listElement.getOffsetForRow({ alignment: 'start', index: 1 }))
  }

  render() {
    return (
      <WindowScroller>
        {({height, isScrolling, registerChild, onChildScroll, scrollTop}: any) => (
          <div className="list-container">
            <div className="header">
              <button onClick={this._scrollToRow} style={{padding: '10px', marginRight: '10px'}}>Scroll to 2500</button>
              <button onClick={this._scrollToTop} style={{padding: '10px', marginRight: '10px'}}>Scroll to top</button>
              <button onClick={this._scrollToPosition} style={{padding: '10px', marginRight: '10px'}}>Scroll to position</button>
              <button onClick={this._getOffsetForRow} style={{padding: '10px', marginRight: '10px'}}>Offset for row #1</button>
            </div>
            <div ref={registerChild}>
              <AutoSizer disableHeight>
                {({width}) => {
                  return <List
                    autoHeight 
                    className="window-size-list"
                    ref={element => this._listElement = element}
                    width={width}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={list.length}
                    rowHeight={50}
                    rowRenderer={this._rowRenderer}
                    noRowsRenderer={this._noRowsRenderer}
                    overscanRowCount={5}
                    scrollToAlignment={'start'}
                    scrollTop={scrollTop}
                  />
                }}
              </AutoSizer>
            </div>
          </div>
        )}
      </WindowScroller>
    )
  }
}