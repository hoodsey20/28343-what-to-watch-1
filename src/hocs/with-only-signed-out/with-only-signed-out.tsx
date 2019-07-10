import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { History } from "history";
import { User } from "../../types";
import { userDataSelector } from "../../reducer/user/selectors";

interface Props {
  history: History;
  user: User;
}

const withOnlySignedOut = Component => {
  class WithOnlySignedOut extends React.PureComponent<Props> {
    render() {
      const { history, user } = this.props;
      if (user) {
        history.goBack();
        return null;
      }
      return <Component {...this.props} />;
    }
  }

  return WithOnlySignedOut;
};

const mapStateToProps = state => ({
  user: userDataSelector(state)
});

export default compose(
  connect(mapStateToProps),
  withOnlySignedOut
);
