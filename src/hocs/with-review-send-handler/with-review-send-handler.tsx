import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { History } from "history";
import { Review, Match, Movie, FormFieldData } from "../../types";

import {
  reviewByIdSelector,
  addReviewErrorSelector,
  movieByIdSelector
} from "../../reducer/movies/selectors";
import { Operation } from "../../reducer/movies/actions";

const REVIEW_MIN_LENGTH = 50;
const REVIEW_MAX_LENGTH = 400;

interface State {}
interface Props {
  reviews: Review[];
  history: History;
  match: Match;
  movie: Movie;
  state: FormFieldData;
}

interface State {
  isFormSending: boolean;
}

const withReviewSendHandler = Component => {
  class WithReviewSendHandler extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        isFormSending: false
      };

      this._sendReviewHandler = this._sendReviewHandler.bind(this);
    }

    static getDerivedStateFromProps(props) {
      if (props.error) {
        return { isFormSending: false };
      }
      return null;
    }

    componentDidUpdate(prevProps) {
      const { reviews, history, match } = this.props;
      if (reviews !== prevProps.reviews) {
        history.push(`/film/${match.params.id}`);
      }
    }

    _getValidationResult() {
      const { state } = this.props;
      const { comment, rating } = state;
      if (!!comment && !!rating) {
        if (
          comment.length >= REVIEW_MIN_LENGTH &&
          comment.length <= REVIEW_MAX_LENGTH
        ) {
          return true;
        }
      }
      return false;
    }

    _sendReviewHandler() {
      const { match, sendReview, state } = this.props;
      const { comment, rating } = state;

      this.setState({ isFormSending: true });
      sendReview(match.params.id, {
        comment,
        rating
      });
    }

    render() {
      const { error, movie } = this.props;
      const { isFormSending } = this.state;

      return (
        <Component
          {...this.props}
          error={error}
          movie={movie}
          isFormValid={this._getValidationResult()}
          isFormSending={isFormSending}
          formSubmitHandler={this._sendReviewHandler}
        />
      );
    }
  }

  return WithReviewSendHandler;
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      reviews: reviewByIdSelector(state, Number(props.match.params.id)),
      error: addReviewErrorSelector(state),
      movie: movieByIdSelector(state, Number(props.match.params.id))
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  sendReview: (id, data) => {
    dispatch(Operation.sendReview(id, data));
  }
});

export default compose(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  ),
  withReviewSendHandler
);
