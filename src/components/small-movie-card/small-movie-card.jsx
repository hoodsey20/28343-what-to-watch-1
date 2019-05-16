import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

const SmallMoovieCard = ({movie, clickHandler, hoverHandler, leaveHandler, isPlaying}) => {
  const {name, cover, src, id} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => hoverHandler(id)}
      onMouseLeave={leaveHandler}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          cover={cover}
          src={src}
          isPlaying={isPlaying}
        />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={(evt) => {
          evt.preventDefault();
          clickHandler(movie);
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
  isPlaying: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func,
  hoverHandler: PropTypes.func,
  leaveHandler: PropTypes.func,
};

export default SmallMoovieCard;
