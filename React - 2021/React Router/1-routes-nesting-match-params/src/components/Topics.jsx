import React from 'react';
import {
  useRouteMatch,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Topic from './Topic';

const Topics = () => {
  // The useRouteMatch hook attempts to match the 'current URL' by default. A custom one can also be specified.
  // If the current URL is an exact match, then match will contain isExact = true.
  // For example if <Topics> is opened via (/nestedRouteTopics) it is an exact match (isExact = true).
  // If <Topics> opened via (/nestedRouteTopics/electronics), it's still a match but not an exact one (isExact = false);
  // match object contains
  // {"path":"/nestedRouteTopics","url":"/nestedRouteTopics","isExact":true,"params":{}}
  const match = useRouteMatch();
  console.log(JSON.stringify(match));

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
        {/* This <Route> will only render when match contains isExact = true. This is only the case
        with (/nestedRouteTopics) */}
        <Route exact path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
        {/* This <Route> will render when there is a match, but the URL contains too many parameters. */}
        <Route path={`${match.path}/:topicId/*`}>
          <Redirect to="/404" />
        </Route>
        {/* This <Route> will render when there is a match, but it is not exact. (/nestedRouteTopics/electronics) */}
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
};

export default Topics;
