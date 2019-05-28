import React from 'react';
import PropTypes from 'prop-types';

import withVideo from '../../hocs/with-video/with-video';
import SmallMoovieCard from '../small-movie-card/small-movie-card.jsx';

const SmallMoovieCardWithVideo = withVideo(SmallMoovieCard);

const MoviesList = ({
  movies,
  cardHoverHandler,
  cardLeaveHandler,
  activeCard,
}) => {
  return (
    <div className="catalog__movies-list">
      {movies.map((it) => <SmallMoovieCardWithVideo
        key={it.id}
        isPlaying={activeCard === it.id}
        movie={it}
        hoverHandler={cardHoverHandler}
        leaveHandler={cardLeaveHandler}
        clickHandler={(movie) => {
          /*eslint-disable*/
          console.log(`фильм: `, movie)
          /*eslint-disable*/
        }}
      />)}
    </div>
  );
}

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
      })
  ).isRequired,
  activeCard: PropTypes.number,
  cardHoverHandler: PropTypes.func.isRequired,
  cardLeaveHandler: PropTypes.func.isRequired,
};
