import React from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  render() {
    const {cover, src} = this.props;

    return (
      <React.Fragment>
        <video
          width="250"
          height="175"
          ref={this._videoRef}
          poster={cover}
          muted
        >
          {src.map((it, i) =>
            <source
              src={it}
              type={`video/${this._getVideoFormat(it)}`}
              key={i}
            />
          )}
        </video>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const video = this._videoRef.current;

    if (video) {
      video.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
      });

      video.ontimeupdate = () => this.setState({
        progress: video.currentTime
      });
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
  }

  _getVideoFormat(name) {
    return name.split(`.`).pop();
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  cover: PropTypes.string,
  src: PropTypes.arrayOf(PropTypes.string),
};
