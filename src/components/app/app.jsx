import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

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
  movies: PropTypes.arrayOf(PropTypes.string)
};
