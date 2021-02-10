import React from "react";

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <h3>{props.user.name}</h3>
      <Avatar user={props.user} />
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.user} />

      <div className="Comment-text">
        <p>{props.comment.text}</p>
      </div>
      
      <div className="Comment-date">
      <p>{formatDate(props.comment.date)}</p>
      </div>
    </div>
  );
}

function formatDate(date) {
  return date.toLocaleDateString();
}

export default Comment;