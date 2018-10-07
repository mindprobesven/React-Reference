import * as React from 'react'
import {Component} from 'react'
import { List, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'

let list: string[] = []

const STATUS_LOADING = 1
const STATUS_LOADED = 2

const generateList = () => {
  for(let i: number = 0; i <= 10000; i++) {
    list = [...list, `Lorem ipsum dolor.`]
  }
  return list
}

interface IState {
  readonly loadedRowCount: number,
  readonly loadedRowsMap: number[],
  readonly loadedRowsData: string[],
  readonly loadingRowCount: number,
  readonly isListReset: boolean
} 

export default class InfinityLoaderList extends Component<{}, IState> {
  readonly state: IState = {
    loadedRowCount: 0,
    loadedRowsMap: [],
    loadedRowsData: [],
    loadingRowCount: 0,
    isListReset: false
  }

  private _timoutIdMap: {[key: string]: any} = {}
  private _listElement: any
  private _infiniteLoaderRef: any

  componentWillMount() {
    generateList()
  }

  componentDidUpdate(prevProps: any, prevState: IState) {
    if(prevState.isListReset !== this.state.isListReset &&
      this.state.isListReset === true) {
      this._resetList()

      this.setState({
        isListReset: false
      })
    }
  }
  
  componentWillUnmount() {
    for(let timeoutId in this._timoutIdMap) {
      clearTimeout(parseInt(timeoutId))
    }
  }

  render() {
    const {loadingRowCount, loadedRowCount} = this.state

    return (
      <div>
        <button onClick={this._clearData} style={{padding: '10px', marginRight: '10px'}}>Reset List</button>
        <button onClick={this._scrollToRow} style={{padding: '10px', marginRight: '10px'}}>Scroll to 1000</button>
        <div>{loadingRowCount} loading, {loadedRowCount} loaded</div>
        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          rowCount={list.length}
          minimumBatchSize={5}
          threshold={5}
          ref={element => this._infiniteLoaderRef = element}
        >
          {({onRowsRendered, registerChild}) => {
            return (
              <List
                overscanRowCount={5}
                scrollToAlignment={'start'}
                onRowsRendered={onRowsRendered}
                ref={element => {
                  this._listElement = element
                  registerChild(element)
                }}
                rowCount={list.length}
                rowHeight={20}
                rowRenderer={this._rowRenderer}
                width={400}
                height={500}
              />
            )
          }}
        </InfiniteLoader>
      </div>
    )
  }

  _scrollToRow = () => {
    this._listElement.scrollToRow(1000)
  }

  _resetList = () => {
    this._infiniteLoaderRef.resetLoadMoreRowsCache(true)
    this._listElement.recomputeRowHeights()
  }

  _clearData = () => {
    this.setState({
      loadedRowCount: 0,
      loadedRowsMap: [],
      loadedRowsData: [],
      loadingRowCount: 0,
      isListReset: true
    })
  }

  _isRowLoaded = ({index}: any) => {
    const {loadedRowsMap} = this.state
    return !!loadedRowsMap[index]
  }

  _loadMoreRows = ({startIndex, stopIndex}: any): any => {
    const {loadedRowsMap, loadingRowCount} = this.state
    const increment = stopIndex - startIndex + 1

    for(let i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment
    })

    const timeoutId = setTimeout(() => {
      const {loadedRowCount, loadingRowCount, loadedRowsData} = this.state

      //delete this._timoutIdMap[timeoutId]

      for(let i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED
        loadedRowsData[i] = list[i]
      }
      
      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment
      })

      promiseResolver()
      //console.log(this._timoutIdMap)
    }, 1000)
    //}, 1000 + Math.round(Math.random() * 2000))

    this._timoutIdMap[timeoutId] = true

    let promiseResolver: any
    //let promiseResolver: {} | PromiseLike<any>

    return new Promise(resolve => {
      promiseResolver = resolve
    })
  }

  _rowRenderer = ({key, index, style}: any) => {
    const {loadedRowsMap, loadedRowsData} = this.state
    
    let content
    
    if(loadedRowsMap[index] === STATUS_LOADED) {
      content = index + ' - ' + loadedRowsData[index]
    } else {
      content = (
        <div style={{width: '200px', height: '15px', backgroundColor: 'grey'}}></div>
      )
    }

    return (
      <div
        key={key}
        style={style}
      >
        {content}
      </div>
    )
  }
}