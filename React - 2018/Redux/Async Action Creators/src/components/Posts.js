import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
  render() {
    const { posts } = this.props

    return (
      <ul>
        {posts.map((post, index) => <li key={index}>{post.title}</li>)}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}