import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
    /**
     * All takes an array of sagas and runs them concurrently
     */
    yield all([call(fetchCollectionsStart)]);
}