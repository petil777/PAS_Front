import {call, put, takeLatest,spawn,take} from 'redux-saga/effects';
import * as actions from 'reducers/user';
import * as api from 'apiAction';

export default function* loginSaga(){
    // yield spawn(handleLogin);

    //Since used spawn in saga/index.js, don't have to while(true) block..?
    yield takeLatest(actions.LOGIN_REQUEST, loginFlow);
    yield takeLatest(actions.LOGOUT_REQUEST, logoutFlow);
    yield spawn(testFlow);
    yield spawn(checkFlow);
}
function* testFlow(){
    while(true){
        yield take(actions.TEST_API);
        try{
            const res = yield call(api.testapi);
            console.log('testFlow success : ', res.data);
        }
        catch(err){
            console.log('test flow err : ', err)
        }
    }
}
function* checkFlow(){
    while(true){
        yield take(actions.CHECK_LOGIN_REQUEST);
        try{
            const res = yield call(api.isLoggedIn);
            if(res.data.success){
                //res.status == 200(304, ...)
                yield put({type:actions.CHECK_LOGIN_SUCCESS})
            }
            else{
                yield put({type:actions.CHECK_LOGIN_FAILURE})
            }
        }
        catch(err){
            yield put({type:actions.CHECK_LOGIN_FAILURE})
        }
    }
    
}

function* loginFlow(action){
    const {username, password, history} = action.payload;
    try{
        const res = yield call(api.login, {username, password});
        if(res.data.user){
            // yield put({type:actions.LOGIN_SUCCESS, payload:{username, password}});
            yield put({type:actions.LOGIN_SUCCESS, payload:res.data.user})
            if(history) history.replace('/');
        }
        else{
            yield put({type:actions.LOGIN_FAILURE, payload:"authentication error : "+res.data.message});
            if(history) history.push('/');
        }
    }
    catch(err){
        yield put({type:actions.LOGIN_FAILURE, payload:err.message +'\n' + err.response.data.message});
    }
}

function* logoutFlow(action){
    //yield put({type:actions.LOGOUT_SUCCESS, payload:{history:action.payload.history}});
    const {history} = action.payload;
    try{
        yield call(api.logout);
        yield put({type:actions.LOGOUT_SUCCESS});
        if(history)history.replace('/')
    }
    catch(err){
        yield put({type:actions.LOGOUT_FAILURE, payload:err.message});
    }
}