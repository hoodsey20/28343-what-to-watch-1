import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import withFormHandler from '../../hocs/with-form-handler/with-form-handler';
import withReviewSendHandler from '../../hocs/with-review-send-handler/with-review-send-handler';
import withOnlySigned from '../../hocs/with-only-signed/with-only-signed';

export const AddReview = ({
  inputHandler,
  formSubmitHandler,
  movie,
  isFormValid,
  isFormSending,
  error,
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
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
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
          evt.preventDefault();
          formSubmitHandler();
        }}>
          <div className="rating">
            <div className="rating__stars" onChange={inputHandler}>

              {[`1`, `2`, `3`, `4`, `5`].map((it) => (
                <React.Fragment key={it}>
                  <input className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it} />
                  <label className="rating__label" htmlFor={`star-${it}`}>Rating {it}</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea onChange={inputHandler} className="add-review__textarea" name="comment" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={(!isFormValid || isFormSending)}
              >Post</button>
            </div>

          </div>
          {error && <h3>{`Error: ${error}`}</h3>}
        </form>
      </div>

    </section>
  );
};


export default withOnlySigned(
    withFormHandler(
        withReviewSendHandler(AddReview)
    )
);

AddReview.propTypes = {
  error: PropTypes.string,
  inputHandler: PropTypes.func.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
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
  isFormValid: PropTypes.bool.isRequired,
  isFormSending: PropTypes.bool.isRequired,
};
