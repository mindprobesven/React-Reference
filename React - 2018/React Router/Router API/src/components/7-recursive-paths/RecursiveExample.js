import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Persons = [
  { id: 0, name:"Sven", friends: [1, 2, 3] },
  { id: 1, name:"Barbara", friends: [0, 2] },
  { id: 2, name:"Thomas", friends: [0, 1, 2] },
  { id: 3, name:"Florian", friends: [0] }
];

const RecursiveExample = () => (
  <Router>
    <Person match={{ params: {id: 0}, url: "" }} />
  </Router>
);

const findPerson = id => Persons.find(person => person.id == id);

const Person = ({ match }) => {
  const person = findPerson(match.params.id);

  return (
    <div>
      <h3>{`${person.name}'s friends`}</h3>
      <ul className="nav-list">
        {
          person.friends.map(friendId => (
            <li key={friendId}>
              <Link to={`${match.url}/${friendId}`}>{findPerson(friendId).name}</Link>
            </li>
          ))
        }
      </ul>

      <Route path={`${match.url}/:id`} component={Person} />
    </div>
  );
};

export default RecursiveExample;