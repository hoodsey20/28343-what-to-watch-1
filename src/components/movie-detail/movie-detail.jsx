import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {userDataSelector} from '../../reducer/user/selectors';
import {similarMoviesSelector} from '../../reducer/movies/selectors';

import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import DetailTabs from '../detail-tabs/detail-tabs.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import withPlayerController from '../../hocs/with-player-controller/with-player-controller';
import withDetailData from '../../hocs/with-detail-data/with-detail-data';

export const MovieDetail = ({
  user,
  movie,
  movies,
  match,
  history,
  tabs,
  reviews,
  playerVisibleHandler,
  setFavoriteStatusHandler,
}) => {
  if (!movie) {
    return null;
  }
  const {
    name,
    released,
    genre,
    backgroundImage,
    posterImage,
    backgroundColor,
    isFavorite,
  } = movie;
  return (
    <React.Fragment>
      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="add" viewBox="0 0 19 20">
          <title>+</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
          </g>
        </symbol><symbol id="full-screen" viewBox="0 0 27 27">
          <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
        </symbol><symbol id="in-list" viewBox="0 0 18 14">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
        </symbol><symbol id="pause" viewBox="0 0 14 21">
          <title>Artboard</title>
          <desc>Created with Sketch.</desc>
          <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
          </g>
        </symbol><symbol id="play-s" viewBox="0 0 19 19">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
        </symbol></svg>
      </div>
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <Logo history={history} />
            <UserBlock history={history} user={user} />
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={playerVisibleHandler} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>

                <button className="btn btn--list movie-card__button" type="button" onClick={setFavoriteStatusHandler}>
                  {(isFavorite && user) ? (
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add" />
                    </svg>
                  )}
                  <span>My list</span>
                </button>

                <a
                  href="add-review.html"
                  className="btn movie-card__button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    history.push(`/film/${match.params.id}/review`);
                  }}
                >Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            {match &&
              <DetailTabs
                movie={movie}
                tabs={tabs}
                reviews={reviews}
              />
            }
          </div>
        </div>
      </section>

      <div className="page-content">
        {(match && genre) &&
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList history={history} movies={movies} />
          </section>
        }
        <footer className="page-footer">
          <div className="logo">
            <a href="#" className="logo__link logo__link--light" onClick={(evt) => {
              evt.preventDefault();
              history.push(`/`);
            }}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      movies: similarMoviesSelector(
          state,
          Number(props.match.params.id)
      ),
      user: userDataSelector(state),
    };
  };

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(
    withDetailData(withPlayerController(MovieDetail))
);

MovieDetail.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
  movies: PropTypes.array,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    released: PropTypes.number,
    genre: PropTypes.string,
    backgroundImage: PropTypes.string,
    posterImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    isFavorite: PropTypes.bool.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  playerVisibleHandler: PropTypes.func,
  setFavoriteStatusHandler: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.string),
  reviews: PropTypes.array,
};
