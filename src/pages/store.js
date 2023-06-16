import { createStore, combineReducers } from 'redux';
import gifsReducer from './reducer';



const rootReducer = combineReducers({
  gifs: gifsReducer,
});

const store = createStore(rootReducer);

export default store;
