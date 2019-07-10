import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {userDataSelector} from '../../reducer/user/selectors';

const withOnlySignedOut = (Component) => {
  class WithOnlySignedOut extends React.PureComponent {
    render() {
      const {history, user} = this.props;
      if (user) {
        history.goBack();
        return null;
      }
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  WithOnlySignedOut.propTypes = {
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

  return WithOnlySignedOut;
};

const mapStateToProps = (state) => ({
  user: userDataSelector(state),
});

export default compose(
    connect(mapStateToProps),
    withOnlySignedOut
);
