import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {userDataSelector} from '../../reducer/user/selectors';

const withOnlySigned = (Component) => {
  class WithOnlySigned extends React.PureComponent {
    render() {
      const {history, user} = this.props;
      if (!user) {
        history.push(`/login`);
        return null;
      }
      return (
        <Component
          {...this.props}
          user={user}
        />
      );
    }
  }

  WithOnlySigned.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  };

  return WithOnlySigned;
};

const mapStateToProps = (state) => ({
  user: userDataSelector(state),
});

export default compose(
    connect(mapStateToProps),
    withOnlySigned
);
