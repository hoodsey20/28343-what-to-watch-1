import * as React from "react";
import { Subtract } from "utility-types";
import ShowMore from "../../components/show-more/show-more";

const ITEMS_COUNT_IN_DATA_CHUNK = 20;

interface State {
  chunkCount: number;
  isShowMoreVisible: boolean;
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {}

const withShowMore = Component => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;
  class WithShowMore extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        chunkCount: 1,
        isShowMoreVisible: false
      };
      this._smowMoreHandler = this._smowMoreHandler.bind(this);
    }

    _smowMoreHandler() {
      const { chunkCount } = this.state;
      const { movies } = this.props;
      const updatedChunkCount = chunkCount + 1;
      this.setState({ chunkCount: updatedChunkCount }, () => {
        if (movies.length < updatedChunkCount * ITEMS_COUNT_IN_DATA_CHUNK) {
          this.setState({ isShowMoreVisible: false });
        }
      });
    }

    componentDidUpdate(prevProps) {
      const { movies } = this.props;
      const { chunkCount } = this.state;

      if (prevProps.movies !== movies) {
        if (
          !movies.length ||
          movies.length < chunkCount * ITEMS_COUNT_IN_DATA_CHUNK
        ) {
          this.setState({ isShowMoreVisible: false });
        } else {
          this.setState({ isShowMoreVisible: true });
        }
      }
    }

    render() {
      const { isShowMoreVisible, chunkCount } = this.state;
      const { movies } = this.props;

      return (
        <React.Fragment>
          <Component
            {...this.props}
            movies={movies.slice(0, chunkCount * ITEMS_COUNT_IN_DATA_CHUNK)}
          />
          <ShowMore
            isVisible={isShowMoreVisible}
            clickHandler={this._smowMoreHandler}
          />
        </React.Fragment>
      );
    }
  }

  return WithShowMore;
};

export default withShowMore;
