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

  return <h3>{`Requested topic ID: ${topicId}`}</h3>;
};

export default Topic;
