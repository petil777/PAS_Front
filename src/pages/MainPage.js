
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const MainPage = () =>{
    return(
        <Fragment>
            <div className="logout">
                <Button variant="primary">Logout</Button>
            </div>
            <div>
                This is main page...
            </div>
        </Fragment>
    )
}
export default MainPage;