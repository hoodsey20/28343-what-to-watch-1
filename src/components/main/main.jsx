import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation} from '../../reducer/movies/actions';

import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import {userDataSelector} from '../../reducer/user/selectors';
import {promoSelector, filteredMoviesSelector} from '../../reducer/movies/selectors';
import withPlayerController from '../../hocs/with-player-controller/with-player-controller';

const Main = ({
  user,
  history,
  playerVisibleHandler,
  movie,
  movies,
  setFavoriteStatus,
}) => {
  const {
    id,
    name,
    released,
    genre,
    backgroundImage,
    posterImage,
    isFavorite,
  } = movie || {};
  return (
    <React.Fragment>
      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="add" viewBox="0 0 19 20">
          <title>+</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
          </g>
        </symbol><symbol id="in-list" viewBox="0 0 18 14">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
        </symbol><symbol id="play-s" viewBox="0 0 19 19">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
        </symbol></svg>
      </div>

      {movie && <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo history={history} />
          <UserBlock history={history} user={user} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster" onClick={() => {
              history.push(`/film/${id}`);
            }}>
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title" onClick={() => {
                history.push(`/film/${id}`);
              }}>{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={playerVisibleHandler} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {user &&
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => setFavoriteStatus(id, isFavorite)}
                  >
                    {isFavorite ? (
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
                }
              </div>
            </div>
          </div>
        </div>
      </section>}

      {movies && <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <MoviesList history={history} movies={movies} />
        </section>

        <footer className="page-footer">
          <Logo history={history} linkClass="logo__link--light" />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: userDataSelector(state),
  movie: promoSelector(state),
  movies: filteredMoviesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFavoriteStatus: (id, status) => {
    dispatch(Operation.sendNewFavoriteStatus(id, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withPlayerController(Main)
);

Main.propTypes = {
  movies: PropTypes.array,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  playerVisibleHandler: PropTypes.func,
  mapDispatchToProps: PropTypes.func,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    released: PropTypes.number,
    genre: PropTypes.string,
    backgroundImage: PropTypes.string,
    posterImage: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),
};
