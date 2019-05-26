import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_GENRE_NAME = `All genres`;

const GenresList = ({genres, category, handleGenreFilter}) => {
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

export default GenresList;