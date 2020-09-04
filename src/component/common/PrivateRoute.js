import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component:Component, isLoggedIn, ...rest}) =>{
    return <Route {...rest} render={props =>{
        if(!isLoggedIn){
            return <Redirect to = "/login"/>
        }
        else{
            return <Component {...props}/>
        }
    }}/>
}
export default PrivateRoute