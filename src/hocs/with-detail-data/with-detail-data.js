import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {reviewByIdSelector} from '../../reducer/movies/selectors';
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
    }

    componentDidUpdate(prevProps) {
      const {activeTab, movieId, loadReview, reviews} = this.props;

      if ((Tabs[activeTab] === `Reviews` && activeTab !== prevProps.activeTab) && !reviews) {
        loadReview(movieId);
      }

    }

    render() {
      const {reviews} = this.props;

      return (
        <Component
          {...this.props}
          tabs={Tabs}
          reviews={reviews}
        />
      );
    }
  }

  WithDetailData.propTypes = {
    activeTab: PropTypes.number.isRequired,
    movieId: PropTypes.string.isRequired,
    loadReview: PropTypes.func,
    reviews: PropTypes.array,
  };

  return WithDetailData;
};


const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      reviews: reviewByIdSelector(state, Number(props.movieId))
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => {
    dispatch(Operation.loadReviews(id));
  }
});

export default compose(
    connect(makeMapStateToProps, mapDispatchToProps),
    withDetailData
);
