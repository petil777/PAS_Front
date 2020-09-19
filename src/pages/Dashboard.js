import React, { useMemo, useState, useEffect } from 'react';
import * as api from 'apiAction';
import * as weatherServiceAction from 'reducers/weatherService';  
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import CardComponent from 'component/CardComponent';

const Dashboard = () =>{
    const dispatch = useDispatch()
    const accInfo = useSelector(state => state.weatherService.accWeatherInfo)
    const yrInfo = useSelector(state => state.weatherService.yrWeatherInfo)
    const dkInfo = useSelector(state => state.weatherService.dkWeatherInfo)
    const weatherLoading = useSelector(state =>state.weatherService.isLoading)
    const [region, setRegion] = useState("")
    const [options, setOptions] = useState({
      chart: {
        zoomType: 'xy',
        width:'1000',
        height:'350'
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
    },{ // Secondary yAxis
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
    const [options3, setOptions3] = useState({...options})
    const AccWeatherChart = useMemo(() =>{
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
    
    const DkWeatherChart = useMemo(()=>{
      const wrap = <HighchartsReact
      highcharts={Highcharts}
      options = {options3}/>
      return wrap
    }, [options3])

    const AccWeatherCard = useMemo(()=>{
      return <CardComponent forecast_date={accInfo['forecast_date']} weather={accInfo['weather']}/>
    }, [accInfo])

    const YrWeatherCard = useMemo(()=>{
      return <CardComponent forecast_date={yrInfo['forecast_date']} weather={yrInfo['weather']}/>
    },[yrInfo])

    const DkWeatherCard = useMemo(()=>{
      return <CardComponent forecast_date={dkInfo['forecast_date']} weather={dkInfo['weather']}/>
    }, [dkInfo])

    const handleGraph = () =>{
      if(region.length>0){
        dispatch(weatherServiceAction.callWeather({'region':region}))
      }
      else{
        toast.error('please give input for region')
      }
    }
    //acc info hook
    useEffect(()=>{
      setOptions(prev =>{
        return {...prev, xAxis:{
          ...prev.xAxis, categories:accInfo['forecast_date'] ? accInfo['forecast_date'] : null
        },  title:{text : "Forecast Result of accuweather"}, subtitle:{text:"Source : https://www.accuweather.com/"} ,
          series:[{
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: accInfo['precip'] ? accInfo['precip'] : [],
          tooltip: {
              valueSuffix: ' %'
          }
        }, { 
          name: 'Temperature High',
          type: 'spline',
          data: accInfo['temp'] ? accInfo['temp']['highTemp'] : [],
          tooltip: {
              valueSuffix: '°C'
          }
      },{ 
        name: 'Temperature Low',
        type: 'spline',
        data: accInfo['temp'] ? accInfo['temp']['lowTemp'] : [],
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
        }, title : {text : 'Forecast Result of norway weather agency'},subtitle:{text:'Source : https://www.yr.no/'},
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
    //dkinfo hook
    useEffect(()=>{
      setOptions3(prev =>{
        return {...prev, xAxis:{
          ...prev.xAxis, categories:dkInfo['forecast_date'] ? dkInfo['forecast_date'] : null
        },  title:{text : "Forecast Result of darksky"}, subtitle:{text:"Source : https://darksky.net/"} ,
          series:[{
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: dkInfo['precip'] ? dkInfo['precip'] : [],
          tooltip: {
              valueSuffix: ' mm'
          }
        }, { 
          name: 'Temperature High',
          type: 'spline',
          data: dkInfo['temp'] ? dkInfo['temp']['highTemp'] : [],
          tooltip: {
              valueSuffix: '°C'
          }
      },{ 
        name: 'Temperature Low',
        type: 'spline',
        data: dkInfo['temp'] ? dkInfo['temp']['lowTemp'] : [],
        tooltip: {
            valueSuffix: '°C'
        }
    }]}
      })
    }, [dkInfo])
    return (
      <div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'3vh'}}>
          <input type="text" onChange = {(e) => setRegion(e.target.value)} placeholder="Please input the region..."/>
          <Button onClick={handleGraph} variant="info" disabled={weatherLoading}>{!weatherLoading ? 'Search' : 'Searching...'}</Button>
          <Button onClick={()=>dispatch(weatherServiceAction.cancelWeather())} variant="danger">Cancel</Button>
        </div>
        <div style={{display:'flex', flexDirection:'column', marginTop:'5vh'}}>
          <div style={{display:'flex', justifyContent:'space-around'}}>
            {AccWeatherChart}
            {AccWeatherCard}
          </div>
          <div style={{marginTop:'1vh'}}></div>
          <div style={{display:'flex', justifyContent:'space-around'}}>
            {YrWeatherChart}
            {YrWeatherCard}
          </div>
          <div style={{marginTop:'1vh'}}></div>
          <div style={{display:'flex', justifyContent:'space-around'}}>
            {DkWeatherChart}
            {DkWeatherCard}
          </div>
        </div>
      </div>
    );
      
    
    
}
export default Dashboard