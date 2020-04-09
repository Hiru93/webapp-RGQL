import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
/** 
 * This import gives access to the localstorage object 
 * and tells redux-persist that we want to use local 
 * storage as default storage
 * */
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

/**
 * key indicates the actual key inside the localstorage
 * storage indicates the destination for the storage, localstorage right now
 * whitelist indicates the list of reducers we have to store and persist
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

/**
 * We are telling to redux-persist that we need to persist out root reducer (rootReducer)
 * using some special configurations (persistConfig)
 */
export default persistReducer(persistConfig, rootReducer);