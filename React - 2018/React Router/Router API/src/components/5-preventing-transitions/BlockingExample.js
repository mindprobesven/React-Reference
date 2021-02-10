import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from 'react-router-dom';

class Form extends Component {
  state = {
    isBlocking: false
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    this.setState({ isBlocking: false });
  }

  render() {
    const { isBlocking } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <Prompt 
            when={isBlocking}
            message={location => `Are you sure to go to ${location.pathname} ?`}
          />

          <p>Blocking? {isBlocking ? "yes" : "no"}</p>

          <input onChange={(e) => this.setState({ isBlocking: true })} placeholder="Type something to block transistions" />
          <br />
          <input type="submit" value="Submit and stop blocking" />
        </form>
      </div>
    );
  }  
}

const BlockingExample = () => (
  <Router>
    <div>
      <h3>Preventing Transitions</h3>
      
      <hr />

      <ul className="nav-list">
        <li><Link to="/">Form</Link></li>
        <li><Link to="/page1">Page 1</Link></li>
        <li><Link to="/page2">Page 2</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Form} />
      <Route path="/page1" render={() => <h3>Page 1 Content</h3>} />
      <Route path="/page2" render={() => <h3>Page 2 Content</h3>} />
    </div>
  </Router>
);

export default BlockingExample;