import {combineReducers} from 'redux';
import {reducer as movies} from './movies/reducer';
import {reducer as user} from './user/reducer';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.MOVIES]: movies,
  [NameSpace.USER]: user,
});
