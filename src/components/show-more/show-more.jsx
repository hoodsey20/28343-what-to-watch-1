import React from 'react';
import PropTypes from 'prop-types';

const ShowMore = ({
  isVisible,
  clickHandler,
}) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="catalog__more">
      <button onClick={clickHandler} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

export default ShowMore;

ShowMore.propTypes = {
  isVisible: PropTypes.bool,
  clickHandler: PropTypes.func,
};


