import React from 'react';
import PropTypes from 'prop-types';

const UserList = ({ users }) => {
  console.log(JSON.stringify(users));

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {
          users.map((user) => <li key={user.id}>{user.first}</li>)
        }
      </ul>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserList;
