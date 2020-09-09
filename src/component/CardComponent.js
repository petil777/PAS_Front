import React, { useMemo, Fragment } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types'
const CardComponent = ({forecast_date, weather}) =>{
    const cardContent= useMemo(()=>{
        let cardElement = []
        if(Array.isArray(forecast_date) && forecast_date.length>0 && 
            Array.isArray(weather) && weather.length>0 && forecast_date.length == weather.length){
            cardElement = forecast_date.reduce((acc, cur, idx)=>{
                acc.push({forecast_date:cur, weather:weather[idx]})
                return acc;
            },[])
        }
        return cardElement.map((cur, idx) =>{
            return(
                <Fragment key={idx}>
                <Card.Title>{cur['forecast_date']} </Card.Title>
                <Card.Text>{cur['weather']}</Card.Text>
                </Fragment>
            )
        })
    },[forecast_date, weather])
    return (
        <Card bg='info' text='white' style={{ width: '20vw', overflowY:'scroll', height:'350px'}}>
            <Card.Header>Weather Briefing</Card.Header>
            <Card.Body>
                {cardContent}
            </Card.Body>
        </Card>
    )
}
CardComponent.propTypes = {
    forecast_date: PropTypes.array,
    weather :  PropTypes.array
}
export default CardComponent