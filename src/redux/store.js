import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';

// import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [thunk];

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

/**
 * Inside this method, i'll place all the sagas running inside my app
 * 
 * This method looks very similar to the root epic one i've always used
 */
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {
    store,
    persistor
};