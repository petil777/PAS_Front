import React, { useMemo, useState, useEffect } from 'react';

import * as api from 'apiAction';
import * as weatherServiceAction from 'reducers/weatherService';  
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Dashboard = () =>{
    const dispatch = useDispatch()
    const accInfo = useSelector(state => state.weatherService.accWeatherInfo)
    const yrInfo = useSelector(state => state.weatherService.yrWeatherInfo)

    const [options, setOptions] = useState({
      chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
            valueSuffix: '°C'
        }
    }]
    })
    const [options2, setOptions2] = useState({...options})
    const AccuWeatherChart = useMemo(() =>{
      const wrap =   <HighchartsReact
      highcharts={Highcharts}
      options={options}/>
      return wrap
    },[options])

    const YrWeatherChart = useMemo(()=>{
      const wrap = <HighchartsReact 
      highcharts = {Highcharts}
      options = {options2}/>
      return wrap
    }, [options2])
    
    const handleGraph = () =>{
      dispatch(weatherServiceAction.callWeather({region:'분당'}))
    }
    //acc info hook
    useEffect(()=>{
      setOptions(prev =>{
        return {...prev, xAxis:{
          ...prev.xAxis, categories:accInfo['forecast_date'] ? accInfo['forecast_date'] : null
        },          
          series:[{
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: accInfo['precip'] ? accInfo['precip'] : [],
          tooltip: {
              valueSuffix: ' mm'
          }
        }, { 
          name: 'Temperature',
          type: 'spline',
          data: accInfo['temp'] ? accInfo['temp'] : [],
          tooltip: {
              valueSuffix: '°C'
          }
      }]}
      })
    },[accInfo])

    //yrinfo hook
    useEffect(()=>{
      setOptions2(prev =>{
        return {...prev, xAxis:{
          ...prev.xAxis, categories:yrInfo['forecast_date'] ? yrInfo['forecast_date'] : null
        },          
          series:[{
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: yrInfo['precip'] ? yrInfo['precip'] : [],
          tooltip: {
              valueSuffix: ' mm'
          }
        }, { 
          name: 'Temperature',
          type: 'spline',
          data: yrInfo['temp'] ? yrInfo['temp'] : [],
          tooltip: {
              valueSuffix: '°C'
          }
      }]}
      })
    },[yrInfo])
    return (
      <div>
        <input type="button" value="Click for acc" onClick={handleGraph}></input>
        {AccuWeatherChart}
        {YrWeatherChart}
      </div>
    );
      
    
    
}
export default Dashboard