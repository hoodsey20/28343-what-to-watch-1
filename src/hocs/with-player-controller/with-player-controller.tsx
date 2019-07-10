import * as React from "react";
import { Subtract } from "utility-types";

import Player from "../../components/player/player";

interface State {
  isVisible: boolean;
  playStatus: boolean;
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {}

const withPlayerController = Component => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithPlayerController extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        playStatus: props.isPlaying || true,
        isVisible: false
      };

      this._playStatusHandler = this._playStatusHandler.bind(this);
      this._playerVisibleHandler = this._playerVisibleHandler.bind(this);
    }

    _playStatusHandler() {
      const { playStatus } = this.state;
      this.setState({ playStatus: !playStatus });
    }

    _playerVisibleHandler() {
      const { isVisible } = this.state;
      const { movie } = this.props;
      if (movie) {
        this.setState({ isVisible: !isVisible });
      }
    }

    render() {
      const { playStatus, isVisible } = this.state;
      const { movie } = this.props;
      return (
        <React.Fragment>
          <Component
            {...this.props}
            playerVisibleHandler={this._playerVisibleHandler}
          />
          {isVisible && (
            <Player
              movie={movie}
              isPlayerMode
              isPlaying={playStatus}
              playStatusHandler={this._playStatusHandler}
              playerVisibleHandler={this._playerVisibleHandler}
            />
          )}
        </React.Fragment>
      );
    }
  }

  return WithPlayerController;
};

export default withPlayerController;
