import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'

import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = (nextSubreddit) => {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, isFetching, lastUpdated, posts } = this.props

    return (
      <div>
        <Picker 
          value={selectedSubreddit}
          options={['reactjs', 'frontend']}
          onChange={this.handleChange} 
        />

        <hr />
        <p>
        {lastUpdated && <span>Last updated at {lastUpdated.toLocaleTimeString()}</span>}
        {!isFetching && <button onClick={this.handleRefreshClick}>Refresh</button>}
        </p>
        {(isFetching && posts.length === 0) && <h2>Loading...</h2>}
        {(!isFetching && posts.length ===0) && <h2>Empty.</h2>}
        {
          posts.length > 0 && 
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div> 
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state

  const { 
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    isFetching,
    lastUpdated,
    posts
  }
}

export default connect(mapStateToProps)(App)