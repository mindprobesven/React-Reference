import React from 'react';
import {
  useRouteMatch,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import Topic from './Topic';

const Topics = () => {
  // The useRouteMatch hook attempts to match the 'current URL'.
  // match object contains
  // {"path":"/nestedRouteTopics","url":"/nestedRouteTopics","isExact":true,"params":{}}
  const match = useRouteMatch();

  return (
    <div>
      <h1>Topics</h1>

      <ul>
        <li>
          {/* match.url is the matched portion of the URL. Useful for building nested <Link>s */}
          <Link to={`${match.url}/electronics`}>Electronics</Link>
        </li>
        <li>
          <Link to={`${match.url}/react`}>React</Link>
        </li>
      </ul>

      <Switch>
        {/* match.path is the path pattern used for matching. Useful for building nested <Route>s */}
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
};

export default Topics;
