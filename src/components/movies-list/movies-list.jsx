import React from 'react';
import PropTypes from 'prop-types';

import withVideo from '../../hocs/with-video/with-video';
import SmallMoovieCard from '../small-movie-card/small-movie-card.jsx';

const SmallMoovieCardWithVideo = withVideo(SmallMoovieCard);

let timeoutID;
const PLAY_DELAY = 1000;
export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };

    this._cardHoverHandler = this._cardHoverHandler.bind(this);
    this._cardLeaveHandler = this._cardLeaveHandler.bind(this);
  }

  _cardHoverHandler(movieId) {
    timeoutID = setTimeout(() => {
      this.setState({activeCard: movieId});
    }, PLAY_DELAY);
  }

  _cardLeaveHandler() {
    clearTimeout(timeoutID);
    this.setState({activeCard: null});
  }

  render() {
    const {movies} = this.props;
    const {activeCard} = this.state;

    return (
      <div className="catalog__movies-list">
        {movies.map((it) => <SmallMoovieCardWithVideo
          key={it.id}
          isPlaying={activeCard === it.id}
          movie={it}
          hoverHandler={this._cardHoverHandler}
          leaveHandler={this._cardLeaveHandler}
          clickHandler={(movie) => {
            /*eslint-disable*/
					  console.log(`фильм: `, movie)
            /*eslint-disable*/
          }}
        />)}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
      })
  ).isRequired,
};
