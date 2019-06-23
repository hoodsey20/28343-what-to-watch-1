import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {favoritesSelector} from '../../reducer/movies/selectors';
import withOnlySigned from '../../hocs/with-only-signed/with-only-signed';

import MoviesList from '../movies-list/movies-list.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';

export const MyList = ({
  history,
  user,
  movies,
}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo history={history} />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock history={history} user={user} />
      </header>


      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList history={history} movies={movies} />
      </section>

      <footer className="page-footer">
        <Logo history={history} linkClass="logo__link--light" />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: favoritesSelector(state),
});

export default connect(mapStateToProps)(
    withOnlySigned(MyList)
);

MyList.propTypes = {
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
};
