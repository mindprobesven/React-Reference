import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

const Topic = () => {
  // useParams returns an object of key/value pairs of URL parameters.
  // Use it to access match.params of the current <Route>
  const { topicId } = useParams();

  // {"topicId":"react"}
  console.log(JSON.stringify({ ...useParams() }));

  // The params can also be retrieved using useRouteMatch()
  // {"path":"/nestedRouteTopics/:topicId","url":"/nestedRouteTopics/react","isExact":true,"params":{"topicId":"react"}}
  console.log(JSON.stringify({ ...useRouteMatch() }));

  // It is possible to manually check if a specified path is an exact match.
  const isMatch = useRouteMatch({
    path: '/nestedRouteTopics/react',
    exact: true,
  });
  // Returns a match object if a match, otherwise null
  console.log(isMatch);

  return <h3>{`Requested topic ID: ${topicId}`}</h3>;
};

export default Topic;
