import * as React from "react";

interface State {
  activeTab: number;
}

const withActiveTab = Component => {
  class WithActiveTab extends React.PureComponent<null, State> {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: 0
      };
      this._changeTabHandler = this._changeTabHandler.bind(this);
    }

    _changeTabHandler(evt, id) {
      evt.preventDefault();
      this.setState({ activeTab: id });
    }

    render() {
      const { activeTab } = this.state;
      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          changeTabHandler={this._changeTabHandler}
        />
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
