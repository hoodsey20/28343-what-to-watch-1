import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/movies/actions';
import {genresSelector, categorySelector} from '../../reducer/movies/selectors';

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
              onClick={(evt) => handleGenreFilter(evt, it)}
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
  genres: genresSelector(state),
  category: categorySelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleGenreFilter: (evt, categoryName) => {
    evt.preventDefault();
    dispatch(ActionCreator.setFilter(categoryName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
