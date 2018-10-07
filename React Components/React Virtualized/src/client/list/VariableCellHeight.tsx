import * as React from 'react'
import { Component} from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import './VariableCellHeight.scss'

let list: string[] = []

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
  minHeight: 50,
  keyMapper: () => 1
})

const generateList = () => {
  for(let i: number = 0; i < 500; i++) {
    i === 2 || i === 4 ? 
    list = [...list, `${i.toString()} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum suscipit enim ac sodales. Etiam erat orci, egestas quis nulla vitae, laoreet tempor lacus. Phasellus erat lectus, luctus at nulla eu, auctor luctus lacus. Nulla facilisi. Sed pellentesque, erat et viverra maximus, nisi leo faucibus diam, eget aliquam diam augue id urna.`]
    : list = [...list, `${i.toString()} - Lorem ipsum dolor.`] 
    
  }
  return list
}

const Item = ({itemId, content, image, onLoadedImage}: any) => {
  return (
    <div className="two-column-container">
      <div className="left-column-container">
        <div className="content">
          {itemId}
        </div>
      </div>
      <div className="right-column-container">
        <div style={{backgroundColor: 'grey',  width: '100%', height: '100%'}}>
          <div style={{ backgroundColor: 'red'}}>
            <img src={image} onLoad={onLoadedImage} style={{verticalAlign: 'top', width: '100%'}} />
          </div>
          <div className="content">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default class VariableCellHeight extends Component {
  private bodyElement: HTMLBodyElement
  private animationFrameResize: number
  private resizeTimout: number
  private _listElement: any

  componentWillMount() {
    generateList()
  }

  componentDidMount() {
    this.bodyElement = document.getElementsByTagName('body')[0]
    this.bodyElement.onresize = () => {
      this.animationFrameResize = requestAnimationFrame(this._onBodyResizeHandler)
    }
  }

  componentWillUnmount() {
    console.log('Shutting down!')

    cancelAnimationFrame(this.animationFrameResize)
    this.bodyElement.onresize = null
    clearTimeout(this.resizeTimout)
  }

  _onBodyResizeHandler = () => {
    clearTimeout(this.resizeTimout)
    this.resizeTimout = window.setTimeout(() => {
      cache.clearAll()
      this._listElement.recomputeRowHeights()
      console.log('cleared')
    }, 100)
    cancelAnimationFrame(this.animationFrameResize)
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
    style,
    parent
  }: any) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({measure}: any) => {
          return (
            <div 
              className="item-container"
              key={key} 
              style={style}
            >
              <Item 
                itemId={index} 
                content={list[index]} 
                image={`https://picsum.photos/1600/900/?image=${index}`}
                onLoadedImage={measure}
              />
            </div>
          )
        }}
      </CellMeasurer>
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
    this._listElement.scrollToRow(100)
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
      
          <div className="list-container">
            <div className="header">
              <button onClick={this._scrollToRow} style={{padding: '10px', marginRight: '10px'}}>Scroll to 100</button>
              <button onClick={this._scrollToTop} style={{padding: '10px', marginRight: '10px'}}>Scroll to top</button>
              <button onClick={this._scrollToPosition} style={{padding: '10px', marginRight: '10px'}}>Scroll to position</button>
              <button onClick={this._getOffsetForRow} style={{padding: '10px', marginRight: '10px'}}>Offset for row #1</button>
            </div>
         
              <AutoSizer>
              {({height, width}) => {
                  return <List
                    className="window-size-list"
                    ref={element => this._listElement = element}
                    deferredMeasurementCache={cache}
                    height={height}
                    width={width}
                    rowCount={list.length}
                    rowHeight={cache.rowHeight}
                    rowRenderer={this._rowRenderer}
                    noRowsRenderer={this._noRowsRenderer}
                    overscanRowCount={2}
                    scrollToAlignment={'start'}
                  />
                }}
              </AutoSizer>
          
          </div>

    )
  }
}