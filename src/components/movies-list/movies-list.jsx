import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {filteredMoviesSelector} from '../../reducer/movies/selectors';
import SmallMoovieCard from '../small-movie-card/small-movie-card.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';

export const MoviesList = ({
  movies,
  cardHoverHandler,
  cardLeaveHandler,
  activeCard,
}) => {
  return (
    <div className="catalog__movies-list">
      {movies.map((it) => <SmallMoovieCard
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

const mapStateToProps = (state) => ({
  movies: filteredMoviesSelector(state),
});

export default connect(mapStateToProps)(
  withActivePlayer(MoviesList)
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
  ).isRequired,
  activeCard: PropTypes.number,
  cardHoverHandler: PropTypes.func.isRequired,
  cardLeaveHandler: PropTypes.func.isRequired,
};
