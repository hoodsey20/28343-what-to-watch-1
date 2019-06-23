import React from 'react';
import PropTypes from 'prop-types';

export const Logo = ({
  history,
  linkClass,
}) => {
  return (
    <div className="logo">
      <a href="#" className={`logo__link ${linkClass ? linkClass : ``}`} onClick={(evt) => {
        evt.preventDefault();
        history.push(`/`);
      }}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
};


export default Logo;

Logo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  linkClass: PropTypes.string,
};
