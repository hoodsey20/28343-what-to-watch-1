import React from 'react';
import PropTypes from 'prop-types';

const SmallMoovieCard = ({movie, onClick, onHover, onLeave}) => {
  const {name, cover} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onHover(movie)}
      onMouseLeave={onLeave}
    >
      <button className="small-movie-card__play-btn" type="button">Play</button>
      <div className="small-movie-card__image">
        <img
          src={cover}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={(evt) => {
          evt.preventDefault();
          onClick(movie);
        }}
      >
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>

  );
};

SmallMoovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cover: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
};

export default SmallMoovieCard;
