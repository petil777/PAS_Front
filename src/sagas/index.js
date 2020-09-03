import {all, spawn} from 'redux-saga/effects';

import user from './user';

export default function* rootSaga(){
    yield all([
        // spawn(loading),
        spawn(user),
    ]);
}