import React from 'react';
import PropTypes from 'prop-types';

import Player from '../../components/player/player.jsx';

const withPlayerController = (Component) => {
  class WithPlayerController extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        playStatus: props.isPlaying || true,
        isVisible: false,
      };

      this._playStatusHandler = this._playStatusHandler.bind(this);
      this._playerVisibleHandler = this._playerVisibleHandler.bind(this);
    }

    _playStatusHandler() {
      const {playStatus} = this.state;
      this.setState({playStatus: !playStatus});
    }

    _playerVisibleHandler() {
      const {isVisible} = this.state;
      const {movie} = this.props;
      if (movie) {
        this.setState({isVisible: !isVisible});
      }
    }

    render() {
      const {playStatus, isVisible} = this.state;
      const {movie} = this.props;
      return (
        <React.Fragment>
          <Component
            {...this.props}
            playerVisibleHandler={this._playerVisibleHandler}
          />
          {isVisible &&
            <Player
              movie={movie}
              isPlayerMode
              isPlaying={playStatus}
              playStatusHandler={this._playStatusHandler}
              playerVisibleHandler={this._playerVisibleHandler}
            />
          }
        </React.Fragment>
      );
    }
  }
  WithPlayerController.propTypes = {
    isPlaying: PropTypes.bool,
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      released: PropTypes.number,
      genre: PropTypes.string,
      backgroundImage: PropTypes.string,
      posterImage: PropTypes.string,
      backgroundColor: PropTypes.string,
    }),
  };

  return WithPlayerController;
};

export default withPlayerController;
