import React from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';

export default class App extends React.Component {
  render() {
    const {movies} = this.props;

    return (
      <Main
        movies={movies}
      />
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
      })
  ).isRequired,
};
