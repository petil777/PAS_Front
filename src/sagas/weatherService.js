import createRequestSaga from 'lib/createRequestSaga';
import {spawn, takeEvery}  from 'redux-saga/effects';
import * as api from 'apiAction';
import * as actions from 'reducers/weatherService';

export default function* watchWeatherSaga(){
    yield spawn(weatherDataFlow);
}
function* weatherDataFlow(){
    // const getWeatherSaga = createRequestSaga(actions.WEATHER_DATA_REQUEST, api.getWeather);
    // yield takeEvery(actions.WEATHER_DATA_REQUEST, getWeatherSaga);
}