import * as React from "react";
import * as PropTypes from "prop-types";
import { Movie } from "../../types";

import SmallMoovieCard from "../small-movie-card/small-movie-card";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withShowMore from "../../hocs/with-show-more/with-show-more";

interface Props {
  movies: Movie[];
  history: any;
  cardHoverHandler: () => void;
  cardLeaveHandler: () => void;
  activeCard: Movie["id"];
}

export const MoviesList: React.SFC<Props> = ({
  movies,
  cardHoverHandler,
  cardLeaveHandler,
  activeCard,
  history
}) => {
  return (
    <div className="catalog__movies-list">
      {movies.map(it => (
        <SmallMoovieCard
          key={it.id}
          isPlaying={activeCard === it.id}
          movie={it}
          hoverHandler={cardHoverHandler}
          leaveHandler={cardLeaveHandler}
          clickHandler={movie => {
            history.push(`/film/${movie.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default withActivePlayer(withShowMore(MoviesList));
