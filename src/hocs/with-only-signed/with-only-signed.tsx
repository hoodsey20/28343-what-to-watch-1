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

const withOnlySigned = Component => {
  class WithOnlySigned extends React.PureComponent<Props> {
    render() {
      const { history, user } = this.props;
      if (!user) {
        history.push(`/login`);
        return null;
      }
      return <Component {...this.props} user={user} />;
    }
  }

  return WithOnlySigned;
};

const mapStateToProps = state => ({
  user: userDataSelector(state)
});

export default compose(
  connect(mapStateToProps),
  withOnlySigned
);
