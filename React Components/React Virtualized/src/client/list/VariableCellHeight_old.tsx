import * as React from 'react'
import { Component} from 'react'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
//import './ListExample.scss'
import 'react-virtualized/styles.css'

let list: string[] = []

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
})

const generateList = () => {
  for(let i: number = 0; i < 500; i++) {
    i === 2 ? 
    list = [...list, `${i.toString()} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum suscipit enim ac sodales. Etiam erat orci, egestas quis nulla vitae, laoreet tempor lacus. Phasellus erat lectus, luctus at nulla eu, auctor luctus lacus. Nulla facilisi. Sed pellentesque, erat et viverra maximus, nisi leo faucibus diam, eget aliquam diam augue id urna.`]
    : list = [...list, `${i.toString()} - Lorem ipsum dolor.`] 
    
  }
  return list
}

export default class VariableCellHeight extends Component {
  private listElement: any
  
  componentWillMount() {
    generateList()
  }
  
  componentDidMount() {
    setTimeout(() => {
      cache.clearAll()
      this.listElement.recomputeRowHeights()
      console.log('cleared')
    }, 3000)
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
        <div key={key} style={style}>
          {list[index]}
          <img src={`https://picsum.photos/1600/900/?image=${index}`} style={{width: '200px', height: '100px'}} />
        </div>
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

  render() {
    return (
      <div style={{
        width: '100%',
        height: '300px',
        backgroundColor: 'grey'
      }}>
      <AutoSizer>
        {({height, width}) => {
          return <List
            ref={element => this.listElement = element}
            width={width}
            height={height}
            rowCount={list.length}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={this._rowRenderer}
            onScroll={this._onScroll}
          />
        }}
      </AutoSizer>
      </div>
    )
  }
}