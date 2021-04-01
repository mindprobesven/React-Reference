import React from 'react';
import { Link } from 'react-router-dom';

const MainNavigation = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/nestedRouteTopics">Topics</Link>
      </li>
    </ul>
  </div>
);

export default MainNavigation;
