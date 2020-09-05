import {createAction, handleActions} from 'redux-actions';
import { toast } from 'react-toastify';

let serviceFileName = 'weatherService';
//1) initialState
export const initialState ={
    serviceName: '',
    data : '',
    message:''
}

//2) action type
export const WEATHER_DATA_REQUEST = `${serviceFileName}/WEATHER_DATA_REQUEST`
export const WEATHER_DATA_SUCCESS = `${serviceFileName}/WEATHER_DATA_SUCCESS`
export const WEATHER_DATA_FAILURE = `${serviceFileName}/WEATHER_DATA_FAILURE`

//3) action creator
export const callWeather = createAction(WEATHER_DATA_REQUEST);

//4) handleAction (all reducers)
export default handleActions({
    [WEATHER_DATA_SUCCESS] : (state, action)=>{
        //action.payload = {} ...some data and check if valid
        return {...state, data : action.payload}
    },
    [WEATHER_DATA_FAILURE] : (state, action)=>{
        console.error('[WEATHER_DATA_FAILURE] : ', action.payload)
        toast.error("Weather data get failure. Check if api server is listening");
        return {...state, data:'', message:action.payload}
    }

    //Added saga having createRequestSaga!
}, initialState)




