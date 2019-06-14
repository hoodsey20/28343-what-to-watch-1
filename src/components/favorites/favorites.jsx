import React from 'react';

import withOnlySigned from '../../hocs/with-only-signed/with-only-signed';

export const Favorites = () => {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__movies-list">
        <article className="small-movie-card catalog__movies-card">
          <button className="small-movie-card__play-btn" type="button">Play</button>
          <div className="small-movie-card__image">
            <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
          </div>
          <h3 className="small-movie-card__title">
            <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
          </h3>
        </article>
      </div>
    </section>
  );
};

Favorites.propTypes = {

};

export default withOnlySigned(Favorites);
