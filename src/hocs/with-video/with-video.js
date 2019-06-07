import React from 'react';
import PropTypes from 'prop-types';

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent {
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
      const {isPlaying} = this.state;
      const {movie} = this.props;
      const {previewImage, previewVideoLink} = movie;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          playButtonClickHandler={this._playButtonClickHandler}
          renderVideo={() => (
            <video
              width="250"
              height="175"
              ref={this._videoRef}
              poster={previewImage}
              src={previewVideoLink}
              muted
            />
          )}
        />
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
          progress: Math.ceil(video.currentTime)
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

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      previewImage: PropTypes.string,
      previewVideoLink: PropTypes.string,
    }).isRequired,
  };

  return WithVideo;
};

export default withVideo;
