import React from 'react';
import PropTypes from 'prop-types';

import withVideo from '../../hocs/with-video/with-video';

export const SmallMoovieCard = ({
  movie,
  clickHandler,
  hoverHandler,
  leaveHandler,
  renderVideo,
}) => {
  const {name, id} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => hoverHandler(id)}
      onMouseLeave={leaveHandler}
    >
      <div className="small-movie-card__image">
        {renderVideo()}
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
    previewImage: PropTypes.string,
    previewVideoLink: PropTypes.string,
  }).isRequired,
  clickHandler: PropTypes.func,
  hoverHandler: PropTypes.func,
  leaveHandler: PropTypes.func,
  renderVideo: PropTypes.func.isRequired,
};

export default withVideo(SmallMoovieCard);
