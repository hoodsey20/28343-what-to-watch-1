import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Movie, Review, Match } from "../../types";

import {
  reviewByIdSelector,
  movieByIdSelector
} from "../../reducer/movies/selectors";
import { Operation } from "../../reducer/movies/actions";

const Tabs = {
  0: `Overview`,
  1: `Details`,
  2: `Reviews`
};

interface Props {
  match: Match;
  movie: Movie;
  reviews: Review[];
  loadReview: (id: number) => void;
  setFavoriteStatus: (id: number, status: boolean) => void;
}

const withDetailData = Component => {
  class WithDetailData extends React.PureComponent<Props> {
    constructor(props) {
      super(props);

      this._setFavoriteStatusHandler = this._setFavoriteStatusHandler.bind(
        this
      );
    }

    componentDidMount() {
      const { match, loadReview } = this.props;
      loadReview(match.params.id);
    }

    _setFavoriteStatusHandler() {
      const { setFavoriteStatus, match, movie } = this.props;
      setFavoriteStatus(match.params.id, movie.isFavorite);
    }

    render() {
      const { reviews } = this.props;

      return (
        <Component
          {...this.props}
          tabs={Tabs}
          reviews={reviews}
          setFavoriteStatusHandler={this._setFavoriteStatusHandler}
        />
      );
    }
  }

  return WithDetailData;
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      reviews: reviewByIdSelector(state, Number(props.match.params.id)),
      movie: movieByIdSelector(state, Number(props.match.params.id))
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  loadReview: id => {
    dispatch(Operation.loadReviews(id));
  },
  setFavoriteStatus: (id, status) => {
    dispatch(Operation.sendNewFavoriteStatus(id, status));
  }
});

export default compose(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  ),
  withDetailData
);
