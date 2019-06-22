import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {reviewByIdSelector, movieByIdSelector} from '../../reducer/movies/selectors';
import {Operation} from '../../reducer/movies/actions';

const Tabs = {
  0: `Overview`,
  1: `Details`,
  2: `Reviews`,
};

const withDetailData = (Component) => {
  class WithDetailData extends React.PureComponent {
    constructor(props) {
      super(props);

      this._setFavoriteStatusHandler = this._setFavoriteStatusHandler.bind(this);
    }

    componentDidMount() {
      const {match, loadReview} = this.props;
      loadReview(match.params.id);
    }

    _setFavoriteStatusHandler() {
      const {setFavoriteStatus, match, movie} = this.props;
      const newStatus = movie.isFavorite ? 0 : 1;
      setFavoriteStatus(match.params.id, newStatus);
    }

    render() {
      const {reviews} = this.props;

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

  WithDetailData.propTypes = {
    reviews: PropTypes.array,
    loadReview: PropTypes.func,
    setFavoriteStatus: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    }),
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    }),
  };

  return WithDetailData;
};


const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      reviews: reviewByIdSelector(state, Number(props.match.params.id)),
      movie: movieByIdSelector(state, Number(props.match.params.id)),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => {
    dispatch(Operation.loadReviews(id));
  },
  setFavoriteStatus: (id, status) => {
    dispatch(Operation.sendNewFavoriteStatus(id, status));
  },
});

export default compose(
    connect(makeMapStateToProps, mapDispatchToProps),
    withDetailData
);
