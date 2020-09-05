import {all, spawn} from 'redux-saga/effects';

// import someService from './someService';
import user from './user';
import weatherService from './weatherService';
export default function* rootSaga(){
    yield all([
        // spawn(loading),
        spawn(user),
        spawn(weatherService)
    ]);
}