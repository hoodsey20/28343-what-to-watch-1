import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {userErrorSelector} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/user/actions';
import withFormHandler from '../../hocs/with-form-handler/with-form-handler';
import {movieByIdSelector} from '../../reducer/movies/selectors';

export const AddReview = ({
  formSubmitHandler,
  inputHandler,
  makeAuth,
  error,
  movie,
  history,
}) => {
  if (!movie) {
    return null;
  }
  const {
    name,
    backgroundImage,
    posterImage,
  } = movie;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <a href="#" className="logo__link" onClick={(evt) => {
              evt.preventDefault();
              history.push(`/`);
            }}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={(evt) => {
          formSubmitHandler(evt);
        }}>
          <div className="rating">
            <div className="rating__stars" onChange={inputHandler}>
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea onChange={inputHandler} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      movie: movieByIdSelector(state, Number(props.match.params.id)),
      error: userErrorSelector(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  makeAuth: (userData) => {
    dispatch(Operation.getUserData(userData));
  },
});

export default connect(makeMapStateToProps, mapDispatchToProps)(
    withFormHandler(AddReview)
);

AddReview.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string,
    posterImage: PropTypes.string,
  }),
};
