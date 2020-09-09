import {call, put, fork, take, race} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
// import * as actions from 'reducers/loading';
//If reducerType exist, it means that reducer have to use the other reducer's state. (Pagination)
export default function createRequestSaga(actionType, requestApi, logicFlow){
    //actionType : SOME_REQUEST
    const actionPrefix = actionType.slice(0, -8)
    const SUCCESS = `${actionPrefix}_SUCCESS`;
    const FAILURE = `${actionPrefix}_FAILURE`;
    const CANCEL = `${actionPrefix}_CANCEL`;
    //Use thisi when no proper logicFlow assigned
    function* proc(action){
        //To get progress with onDownloadProgress in api
        let emit;
        const chan = eventChannel(emitter =>{
            emit = emitter;
            return ()=>{}
        });
        yield fork(watchOnProgress, chan, actionType);
        
        // yield put({type:actions.START_LOADING, payload:actionType});
        try{
            const res = yield call(requestApi, action.payload, emit);
            //Error message check
            if(res.data.message){
                yield put({type:FAILURE, payload:res.data.message})
            }
            else{
                yield put({type:SUCCESS, payload:res.data});

            }

            // yield put({type:actions.FINISH_LOADING, payload:actionType});
        }
        catch(err){
            yield put({type:FAILURE, payload:err, error:true});//see err.response for detail
            // yield put({type:actions.FAILURE_LOADING, payload:{actionType, message:err.message}});//for using fail loading form
        }
    }
    return function*(action){
        //action.type = reducerType/actionType ..ex) user/LOGIN_REQUEST
        const res = yield race({
            task: call(logicFlow ? logicFlow : proc, action),
            cancel: take(CANCEL)
        });
        //If Receive as object, task key exist with null value. Cuz call wasn't reducer action, there is no action type
        if('task' in res){
           //Can reach here...
        }
        if('cancel' in res){
            yield put({type:FAILURE, payload:{message: actionType + " CANCELLED!"}})
            // yield put({type: actions.FAILURE_LOADING, payload:{actionType, message: "REQUEST CANCELLED!"}});
        }
    }
}
function *watchOnProgress(chan, actionType){
    while(true){
        const progress = yield take(chan);
        // yield put({type:actions.IN_LOADING, payload:{actionType, progress}});
    }
}