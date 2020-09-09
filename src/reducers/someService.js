import {createAction, handleActions} from 'redux-actions';
import { toast } from 'react-toastify';

let serviceFileName = 'someService';
//1) initialState
export const initialState ={
    serviceName: '',
    data : '',
    message:''
}

//2) action type
export const SOME_DATA_REQUEST = `${serviceFileName}/SOME_DATA_REQUEST`
export const SOME_DATA_SUCCESS = `${serviceFileName}/SOME_DATA_SUCCESS`
export const SOME_DATA_FAILURE = `${serviceFileName}/SOME_DATA_FAILURE`
export const SOME_DATA_CANCEL = `${serviceFileName}/SOME_DATA_CANCEL`
//3) action creator
export const callWeather = createAction(SOME_DATA_REQUEST);

//4) handleAction (all reducers)
export default handleActions({
    [SOME_DATA_SUCCESS] : (state, action)=>{
        //action.payload = {} ...some data and check if valid
        return {...state, data : action.payload}
    },
    [SOME_DATA_FAILURE] : (state, action)=>{
        console.error('[SOME_DATA_FAILURE] : ', action.payload)
        toast.error("some data get failure. Check if api server is listening");
        return {...state, data:'', message:action.payload}
    }

    //Added saga having createRequestSaga!
}, initialState)




