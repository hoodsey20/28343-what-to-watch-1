import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../actions';
import Main from '../main/main.jsx';

class App extends React.Component {
  _getGenresList() {
    const {movies} = this.props;
    const genres = new Set().add(null);
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => genres.add(genre));
    });
    return Array.from(genres);
  }

  render() {
    const {filteredMovies, category, handleGenreFilter} = this.props;

    return (
      <Main
        movies={filteredMovies}
        category={category}
        handleGenreFilter={handleGenreFilter}
        genres={this._getGenresList()}
      />
    );
  }
}

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
  category: PropTypes.string,
  handleGenreFilter: PropTypes.func.isRequired,
};

export {App};

const mapStateToProps = (state) => ({
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
