import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, render } from 'react-router-dom'

const cars = [
  {type:"Volvo", year:2016},
  {type:"Saab", year:2001},
  {type:"BMW", year:2010},
  {type:"Mercedes", year:2013},
  {type:"Audi", year:2007},
  {type:"VW", year:2007}
]

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/cars'><li>Cars</li></Link>
          </ul>

          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/cars' render={props => <OrderedList items={cars} {...props} />} />
            <Route component={NotFound404} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const Home = () => <h3>Home Page</h3>
const NotFound404 = () => <h3>404 - Not Found</h3>

const OrderedList = ({ match, items }) => {
  return (
    <div>
      <ul>
        <Link to={`${match.url}`}><li>Unordered</li></Link>
        <Link to={`${match.url}/asc`}><li>Ascending</li></Link>
        <Link to={`${match.url}/desc`}><li>Descending</li></Link>
      </ul>

      <hr />

      <Route path={`${match.url}/:direction(asc|desc)?`} render={props => <List {...props} items={items} />} />
    </div>
  )
}

const List = ({ match: { params }, items }) => {
  const compareAscending = (a, b) => {
    let x = a.type.toLowerCase()
    let y = b.type.toLowerCase()
   
    /* long form   
      if(x < y) { return -1 }
      if(x > y) { return 1 }
      return 0
    */

    return x < y ? -1 : x > y ? 1 : 0
  }

  const compareDescending = (a, b) => {
    let x = a.type.toLowerCase()
    let y = b.type.toLowerCase()

    return x < y ? 1 : x > y ? -1 : 0
  }
  
  const sortItems = (items) => {
    switch(params.direction) {
      case 'asc':
        return items.slice().sort(compareAscending)
      case 'desc':
        return items.slice().sort(compareDescending)
      default:
        return items
    }
  }
  
  return (
    <div>
      <ul>
        {sortItems(items).map((car, index) => <li key={index}>{`${car.type} - ${car.year}`}</li>)}
      </ul>
    </div>
  )
}

export default App