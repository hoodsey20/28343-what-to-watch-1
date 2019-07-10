import * as React from "react";
import * as PropTypes from "prop-types";

export const UserBlock = ({ history, user }) => {
  return (
    <div className="user-block">
      {user ? (
        <div
          className="user-block__avatar"
          onClick={() => {
            history.push(`/mylist`);
          }}
        >
          <img
            src={`https://es31-server.appspot.com${user.avatarUrl}`}
            alt="User avatar"
            width="63"
            height="63"
          />
        </div>
      ) : (
        <a
          onClick={evt => {
            evt.preventDefault();
            history.push(`/login`);
          }}
          href="#"
          className="user-block__link"
        >
          Sign in
        </a>
      )}
    </div>
  );
};

export default UserBlock;

UserBlock.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  user: PropTypes.shape({
    avatarUrl: PropTypes.string
  })
};
