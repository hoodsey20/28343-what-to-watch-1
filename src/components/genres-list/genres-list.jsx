import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../actions';

const DEFAULT_GENRE_NAME = `All genres`;

export const GenresList = ({genres, category, handleGenreFilter}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((it, i) => {
        const isCurrentGenre = it === category;
        const activeClass = isCurrentGenre ? `catalog__genres-item--active` : null;
        const genreName = it ? it : DEFAULT_GENRE_NAME;
        return (
          <li key={i} className={`catalog__genres-item ${activeClass}`}>
            <a
              href="#"
              className="catalog__genres-link"
              onClick={() => handleGenreFilter(it)}
            >
              {genreName}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
  category: PropTypes.string,
  handleGenreFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genres: state.genres,
  category: state.category,
  movies: state.filteredMovies,
});

const mapDispatchToProps = (dispatch) => ({
  handleGenreFilter: (categoryName) => {
    dispatch(ActionCreator.setFilter(categoryName));
    dispatch(ActionCreator.getFilteredMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
