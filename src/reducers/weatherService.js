import {createAction, handleActions} from 'redux-actions';
import { toast } from 'react-toastify';

let serviceFileName = 'weatherService';
//1) initialState
export const initialState ={
    serviceName: '',
    data : '',
    accWeatherInfo:'',
    yrWeatherInfo:'',
    message:'',
    isLoading:false
}

//2) action type
export const WEATHER_DATA_REQUEST = `${serviceFileName}/WEATHER_DATA_REQUEST`
export const WEATHER_DATA_SUCCESS = `${serviceFileName}/WEATHER_DATA_SUCCESS`
export const WEATHER_DATA_FAILURE = `${serviceFileName}/WEATHER_DATA_FAILURE`
export const WEATHER_DATA_CANCEL = `${serviceFileName}/WEATHER_DATA_CANCEL`

//3) action creator
export const callWeather = createAction(WEATHER_DATA_REQUEST);
export const cancelWeather = createAction(WEATHER_DATA_CANCEL);

//4) handleAction (all reducers)
export default handleActions({
    [WEATHER_DATA_REQUEST] : (state, action) =>{
        toast.info("Searching....")
        return {...state, isLoading:true};
    },
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
                "forecast_date": "Wednesday9 September12–18" (요일/일/월/시간대)
            },
         */
        let msg = ''
        if(typeof weatherData[0] == 'object'){
            let highTemp = weatherData[0].reduce((acc, cur)=>{
                let highTemp = cur['temp'].split('\n')[0]
                highTemp = highTemp.substring(0, highTemp.length-1)//exclude celcius
                acc.push(parseFloat(highTemp))
                return acc
            },[])
            let lowTemp = weatherData[0].reduce((acc, cur)=>{
                let lowTemp = cur['temp'].split('\n')[1]
                lowTemp = lowTemp.substring(1, lowTemp.length-1)//exclude celcius and /
                acc.push(parseFloat(lowTemp))
                return acc
            },[])
            let precips = weatherData[0].reduce((acc, cur)=>{
                acc.push(parseFloat(cur['precip'].substring(0, cur['precip'].length-1)))//exclude %
                return acc
            },[])
            let dates = weatherData[0].reduce((acc, cur)=>{
                acc.push(cur['forecast_date'])
                return acc;
            },[])
            let weathers = weatherData[0].reduce((acc, cur)=>{
                acc.push(cur['weather'])
                return acc;
            },[])
            accWeatherInfo = {temp:{highTemp, lowTemp}, precip : precips, forecast_date:dates, weather:weathers}
        }
        else{
            msg = "Accuweather data not properly received"
        }
        if(typeof weatherData[1] == 'object'){
            let temps = weatherData[1].reduce((acc, cur)=>{
                acc.push(parseInt(cur['temp'].substring(0, cur['temp'].length-1)))
                return acc;
            },[])
            let precips = weatherData[1].reduce((acc, cur)=>{
                acc.push(parseInt(cur['precip'].split(' mm')[0]))
                return acc;
            },[])
            let dates = weatherData[1].reduce((acc, cur)=>{
                acc.push(cur['forecast_date'])
                return acc;
            },[])
            let weathers = weatherData[1].reduce((acc, cur)=>{
                acc.push(cur['weather'])
                return acc;
            },[])
            yrWeatherInfo = {temp:temps, precip: precips, forecast_date:dates, weather:weathers}
        }
        else{
            msg += "\nyrweather data not properly received"
        }
        toast.success("Weather Data Request Success!")
        if(msg){
            toast.warn(msg)
        }
        return {...state, accWeatherInfo:accWeatherInfo, yrWeatherInfo:yrWeatherInfo, 
            message:msg, isLoading:false}
    },
    [WEATHER_DATA_FAILURE] : (state, action)=>{
        console.error('[WEATHER_DATA_FAILURE] : ', action.payload)
        toast.error("Weather data get failed. : ", action.payload);
        return {...state, data:'', message:action.payload, isLoading:false}
    },
    [WEATHER_DATA_CANCEL] : (state, action) =>{
        toast.info("You cancelled weather data request")
        return {...state, isLoading:false}
    }

    //Added saga having createRequestSaga!
}, initialState)




