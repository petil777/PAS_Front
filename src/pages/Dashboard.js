import React, { useMemo, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';
import * as api from 'apiAction';
import * as weatherServiceAction from 'reducers/weatherService';  
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () =>{
    const dispatch = useDispatch()
    const accInfo = useSelector(state => state.weatherService.accWeatherInfo)
    const AccuWeatherChart = useMemo(() =>{
      const wrap = 
        <LineChart width={1000} height={400} data={accInfo}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="forecast_date" padding={{ left: 30, right: 30 }} />
        <YAxis domain={[0, 100]}/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="precip" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
        </LineChart>
      return wrap
    },[accInfo])
    
    const handleAcc = () =>{
      dispatch(weatherServiceAction.callWeather({region:'분당'}))
    }
    return (
      <div>
        <input type="button" value="Click for acc" onClick={handleAcc}></input>
        {AccuWeatherChart}
      </div>
    );
      
    
    
}
export default Dashboard