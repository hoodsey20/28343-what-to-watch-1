import * as React from "react";
import * as PropTypes from "prop-types";
import { Subtract } from "utility-types";

interface State {
  progress: number;
  duration: number;
  isLoading: boolean;
  isPlaying: boolean;
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  renderVideo: (additionalClass: string) => typeof HTMLVideoElement;
}

const withVideo = Component => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithVideo extends React.PureComponent<T, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        progress: 0,
        duration: 0,
        isLoading: true,
        isPlaying: props.isPlaying
      };

      this._setFullScreen = this._setFullScreen.bind(this);
    }

    render() {
      const { isPlaying, progress, duration } = this.state;
      const { movie } = this.props;
      const { previewImage, previewVideoLink } = movie;

      return (
        <Component
          {...this.props}
          progress={progress}
          duration={duration}
          isPlaying={isPlaying}
          fullScreenHandler={this._setFullScreen}
          renderVideo={additionalClass => (
            <video
              width="280"
              height="175"
              ref={this._videoRef}
              poster={previewImage}
              src={previewVideoLink}
              muted
              className={additionalClass ? additionalClass : ``}
            />
          )}
        />
      );
    }

    componentDidMount() {
      const video = this._videoRef.current;

      if (video) {
        video.oncanplaythrough = () =>
          this.setState({
            isLoading: false
          });

        video.onplay = () => {
          this.setState({
            isPlaying: true
          });
        };

        video.onpause = () =>
          this.setState({
            isPlaying: false
          });

        video.ontimeupdate = () =>
          this.setState({
            duration: Math.ceil(video.duration),
            progress: Math.ceil(video.currentTime)
          });
      }
    }

    componentDidUpdate() {
      const { isPlaying, isPlayerMode } = this.props;
      const video = this._videoRef.current;

      if (isPlaying) {
        video.play();
        return;
      }

      if (isPlayerMode) {
        video.pause();
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

    _setFullScreen() {
      const video = this._videoRef.current;

      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool,
    isPlayerMode: PropTypes.bool,
    movie: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      previewImage: PropTypes.string,
      previewVideoLink: PropTypes.string
    }).isRequired
  };

  return WithVideo;
};

export default withVideo;
