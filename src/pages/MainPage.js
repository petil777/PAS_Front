
import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as userAction from 'reducers/user'
import { useDispatch } from 'react-redux';
import Dashboard from 'pages/Dashboard'

const MainPage = ({history}) =>{
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(userAction.logout({history}))
    }
    return(
        <div className="main">
            <div className="logout">
                <Button variant="primary" onClick={handleLogout}>Logout</Button>
            </div>
            {/**Other common component */}
            
                <Switch>
                    <Route exact path="/" render={()=> <Redirect to="/dashboard" />} />
                    <Route path={`/dashboard`} exact component={Dashboard}/>
                </Switch>
                {/**
                <Switch>
                <Route exact path="/" render={()=> <Redirect to="/dashboard" />} />
                <Route path={`${match.url}dashboard`} exact component={Dashboard}/>
                <Route path={`${match.url}somepage`} exact component={somepage}/>
                </Switch>
                */}
           
        </div>
    )
}
export default MainPage;