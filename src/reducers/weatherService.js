import {createAction, handleActions} from 'redux-actions';
import { toast } from 'react-toastify';

let serviceFileName = 'weatherService';
//1) initialState
export const initialState ={
    serviceName: '',
    data : '',
    accWeatherInfo:[],
    yrWeatherInfo:[],
    message:''
}

//2) action type
export const WEATHER_DATA_REQUEST = `${serviceFileName}/WEATHER_DATA_REQUEST`
export const WEATHER_DATA_SUCCESS = `${serviceFileName}/WEATHER_DATA_SUCCESS`
export const WEATHER_DATA_FAILURE = `${serviceFileName}/WEATHER_DATA_FAILURE`
export const WEATHER_DATA_CANCEL = `${serviceFileName}/WEATHER_DATA_CANCEL`

//3) action creator
export const callWeather = createAction(WEATHER_DATA_REQUEST);

//4) handleAction (all reducers)
export default handleActions({
    [WEATHER_DATA_SUCCESS] : (state, action)=>{
        const weatherData = action.payload;
        let accWeatherInfo = ''
        let yrWeatherInfo = ''
        //weatherData[0] : accu
        /**
         * [
            {
                "weather": "Wind and rain from typhoon",
                "temp": "25°\n/21°",
                "forecast_date": "Mon\n9/7",
                "precip": "90%"
            },
         */
        //weatherData[1] : yr
        /**
         * [
            {
                "temp": "24°",
                "precip": "0.1 mm",
                "weather": "Fair. ",
                "forecast_date": "2020/09/08"
            },
         */
        //This is error
        if(typeof weatherData[0] == 'object'){
            accWeatherInfo = weatherData[0].map(obj =>{
                let robj = {...obj}
                let highTemp = obj['temp'].split('\n')[0]
                highTemp = highTemp.substring(0, highTemp.length-1)//exclude celcius
                let lowTemp = obj['temp'].split('\n')[1]
                lowTemp = lowTemp.substring(1, lowTemp.length-1)//exclude celcius and /
                robj['temp'] = (parseInt(highTemp) + parseInt(lowTemp)) / 2
                robj['precip'] = obj['precip'].substring(0, obj['precip'].length-1)//exclude %
                return robj
            })
        }
        //action.payload = {} ...some data and check if valid
        return {...state, accWeatherInfo:accWeatherInfo}
    },
    [WEATHER_DATA_FAILURE] : (state, action)=>{
        console.error('[WEATHER_DATA_FAILURE] : ', action.payload)
        toast.error("Weather data get failure. Check if api server is listening");
        return {...state, data:'', message:action.payload}
    },
    [WEATHER_DATA_CANCEL] : (state, action) =>{
        toast.info("You cancelled weather data request")
        return {...state}
    }

    //Added saga having createRequestSaga!
}, initialState)




