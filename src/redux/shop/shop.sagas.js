/**
 * TakeEvery permits to not pause the javascript meanwhile a saga is fired
 * Call is a method that takes as the first argument a function and the subsequent arguments are the param of the function used
 * Put its the equivalent of dispatch
 * TakeLatest allows to fire multiple actions and consider only the latest one (instead of everyone, provided by takeEvery)
 */
import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { 
    fetchCollectionsSuccess,
    fetchCollectionsFailure
 } from './shop.actions';

import ShopActionTypes from './shop.types';


export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        /**
         * yield returns an object with a structure that resembles the one of a promise
         */
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

/**
 * This particular syntax is required to create a generator function
 * A generator function is a special function type that allow to yiel values
 * during its execution and returns a special kind of obj; this special kind of function
 * also allows to proceed trought each yield using the keyword functionName.next().
 * 
 * With this method, each yield act like a breakpoint and the function execution in paused
 * until it's reached the next .next() invocation
 */
export function* fetchCollectionsStart() {
    /**
     * yield allows to "stop" the function execution to this specific point
     * it basically act like a "break-point" normally used for debugging purposes
     */
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}