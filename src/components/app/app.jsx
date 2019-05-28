import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../actions';
import Main from '../main/main.jsx';

const App = ({
  filteredMovies,
  category,
  handleGenreFilter,
  genres,
}) => {
  return (
    <Main
      movies={filteredMovies}
      category={category}
      handleGenreFilter={handleGenreFilter}
      genres={genres}
    />
  );
};

App.propTypes = {
  filteredMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
      })
  ).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
      })
  ).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  category: PropTypes.string,
  handleGenreFilter: PropTypes.func.isRequired,
};

export {App};

const mapStateToProps = (state) => ({
  genres: state.genres,
  category: state.category,
  movies: state.movies,
  filteredMovies: state.filteredMovies,
});

const mapDispatchToProps = (dispatch) => ({
  handleGenreFilter: (categoryName) => {
    dispatch(ActionCreator.setFilter(categoryName));
    dispatch(ActionCreator.getFilteredMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
