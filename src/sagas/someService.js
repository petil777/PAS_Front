import createRequestSaga from 'lib/createRequestSaga';
import {spawn, takeEvery, put, take, call}  from 'redux-saga/effects';
import * as api from 'apiAction';
import * as actions from 'reducers/someService';

export default function* watchServiceSaga(){
    yield spawn(someDataFlow);
    /*
        //Same with while(true){yield take()}. use takeLatest in case.
        const action = yield take(actions.SOME_DATA_REQUEST);
        const res = yield call(api.somefunction , acion.payload);//api, param1, param2, ...
    */
    yield takeEvery(actions.SOME_DATA_REQUEST, otherDataFlow);
}
function* someDataFlow(){
    const getDataSaga = createRequestSaga(actions.SOME_DATA_REQUEST, api.somefunction);
    yield takeEvery(actions.SOME_DATA_REQUEST, getDataSaga);
}
function* otherDataFlow(action){
    try{
        const res = yield call(api.otherfunction, action.payload);
        if(res.data){
            yield put({type:actions.SOME_DATA_SUCCESS, payload:res.data})
        }
        else{
            yield put({type:actions.SOME_DATA_FAILURE, payload:{message:"No Proper Data Found"}});
        }
    }catch(err){
        yield put({type:actions.SOME_DATA_FAILURE, payload:err.message})

    }
}