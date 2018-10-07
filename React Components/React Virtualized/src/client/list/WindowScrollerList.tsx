import * as React from 'react'
import { Component} from 'react'
import { WindowScroller, AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import './WindowScrollerList.scss'

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

export default class WindowScrollerList extends Component {
  private _listElement: any
  
  componentWillMount() {
    generateList()

    setTimeout(() => {
      console.log('Scroll to Row')
      this._listElement.scrollToRow(2500)
    }, 2000)
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

  render() {
    return (
      <WindowScroller>
        {({height, isScrolling, onChildScroll, scrollTop}: any) => (
          <div className="auto-size-list-container">
            <AutoSizer disableHeight>
              {({width}) => {
                return <List
                  autoHeight 
                  height={height}
                  className="window-size-list"
                  ref={element => this._listElement = element}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={list.length}
                  rowHeight={50}
                  rowRenderer={this._rowRenderer}
                  noRowsRenderer={this._noRowsRenderer}
                  overscanRowCount={5}
                  scrollToAlignment={'start'}
                  scrollTop={scrollTop}
                  width={width}
                />
              }}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
    )
  }
}