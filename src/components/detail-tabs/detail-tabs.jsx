import React from 'react';
import PropTypes from 'prop-types';

import withActiveTab from '../../hocs/with-active-tab/with-active-tab';
import withDetailData from '../../hocs/with-detail-data/with-detail-data';

function getRatingName(rating) {
  if (rating < 3) {
    return `Bad`;
  } else if (rating < 5) {
    return `Normal`;
  } else if (rating < 8) {
    return `Good`;
  } else if (rating < 10) {
    return `Very good`;
  }
  return `Awesome`;
}

function getFormattedTime(time) {
  return `${Math.floor(time / 60)}h ${time % 60}m`;
}

function getFormattedDate(dateString) {
  const options = {year: `numeric`, month: `long`, day: `numeric`};
  return new Date(dateString).toLocaleDateString(`en-US`, options);
}

function renderReviews(reviews) {
  return reviews.map((it) => (
    <div key={it.id} className="review">
      <blockquote className="review__quote">
        <p className="review__text">{it.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{it.user.name}</cite>
          <time className="review__date">{getFormattedDate(it.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{it.rating}</div>
    </div>
  ));
}

export const DetailTabs = ({
  movie,
  changeTabHandler,
  activeTab,
  tabs,
  reviews,
}) => {
  const {
    released,
    genre,
    director,
    runTime,
    starring,
    rating,
    scoresCount,
    description,
  } = movie;
  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Object.keys(tabs).map((it) => (
            <li
              key={it}
              className={`movie-nav__item ${Number(it) === activeTab ? `movie-nav__item--active` : ``}`}
            >
              <a
                href="#"
                className="movie-nav__link"
                onClick={(evt) => changeTabHandler(evt, Number(it))}
              >
                {tabs[it]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {tabs[activeTab] === `Overview` &&
        <React.Fragment>
          <div className="movie-rating">
            <div className="movie-rating__score">{rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getRatingName(rating)}</span>
              <span className="movie-rating__count">{scoresCount} ratings</span>
            </p>
          </div>

          <div className="movie-card__text">
            <p>{description}</p>
            <p className="movie-card__director"><strong>Director: {director}</strong></p>
            <p className="movie-card__starring"><strong>{starring.join(`, `)} and other</strong></p>
          </div>
        </React.Fragment>
      }

      {tabs[activeTab] === `Details` &&
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {starring.map((it, i) => (
                  <span key={i}>
                    {it}
                    <br />
                  </span>
                ))}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{getFormattedTime(runTime)}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{released}</span>
            </p>
          </div>
        </div>
      }

      {(tabs[activeTab] === `Reviews` && !!reviews) &&
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {renderReviews(reviews.slice(reviews.length / 2))}
          </div>
          <div className="movie-card__reviews-col">
            {renderReviews(reviews.slice(0, reviews.length / 2))}
          </div>
        </div>
      }
    </div>
  );
};

export default withActiveTab(
    withDetailData(DetailTabs)
);

DetailTabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  changeTabHandler: PropTypes.func.isRequired,
  tabs: PropTypes.objectOf(PropTypes.string),

  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    released: PropTypes.number,
    runTime: PropTypes.number,
    genre: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    starring: PropTypes.arrayOf(PropTypes.string),
  }),

  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.number,
        rating: PropTypes.number,
        user: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      })
  ),
};
