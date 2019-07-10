import * as React from "react";

let timeoutID;
const PLAY_DELAY = 1000;

const withActivePlayer = Component => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeCard: null
      };

      this._cardHoverHandler = this._cardHoverHandler.bind(this);
      this._cardLeaveHandler = this._cardLeaveHandler.bind(this);
    }

    _cardHoverHandler(movieId) {
      timeoutID = setTimeout(() => {
        this.setState({ activeCard: movieId });
      }, PLAY_DELAY);
    }

    _cardLeaveHandler() {
      clearTimeout(timeoutID);
      this.setState({ activeCard: null });
    }

    componentWillUnmount() {
      clearTimeout(timeoutID);
    }

    render() {
      const { activeCard } = this.state;
      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          cardHoverHandler={this._cardHoverHandler}
          cardLeaveHandler={this._cardLeaveHandler}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
