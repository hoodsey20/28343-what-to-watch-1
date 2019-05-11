import React from 'react';
import PropTypes from 'prop-types';

import SmallMoovieCard from '../small-movie-card/small-movie-card.jsx';

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };

    this._cardHoverHandler = this._cardHoverHandler.bind(this);
    this._cardLeaveHandler = this._cardLeaveHandler.bind(this);
  }

  _cardHoverHandler(movie) {
    this.setState({activeCard: movie});
  }

  _cardLeaveHandler() {
    this.setState({activeCard: null});
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((it) => <SmallMoovieCard
          key={it.id}
          movie={it}
          onHover={this._cardHoverHandler}
          onLeave={this._cardLeaveHandler}
          onClick={(movie) => {
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
