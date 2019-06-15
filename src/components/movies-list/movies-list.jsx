import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {filteredMoviesSelector, filteredByGenreSelector} from '../../reducer/movies/selectors';
import SmallMoovieCard from '../small-movie-card/small-movie-card.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';

export const MoviesList = ({
  movies,
  cardHoverHandler,
  cardLeaveHandler,
  activeCard,
  history,
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
          history.push(`/film/${movie.id}`);
        }}
      />)}
    </div>
  );
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    if (props.genreLike) {
      return {movies: filteredByGenreSelector(state, props.genreLike)};
    } else {
      return {movies: filteredMoviesSelector(state)};
    }
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(
    withActivePlayer(MoviesList)
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
  ).isRequired,
  genreLike: PropTypes.string,
  activeCard: PropTypes.number,
  cardHoverHandler: PropTypes.func.isRequired,
  cardLeaveHandler: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
};
