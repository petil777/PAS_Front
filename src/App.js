
import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'

import './App.scss';
import PrivateRoute from './component/common/PrivateRoute';
import { Provider, useSelector } from 'react-redux';
import reducers from './reducers'
import rootSaga from './sagas';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { createStore, compose, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';

const App = () =>{
    const loginStatus = useSelector(state => state.user.loginStatus)

    return(
        <div className="App">
                {/**<Route exact path='/register' component={RegisterPage}/> */}

            {/*LoginStatus : {JSON.stringify(loginStatus)}
            <a href="http://localhost:4000/auth/google/login">Log in with google</a>
            <button onClick={()=>dispatch(userActions.testing())}>Check!</button>*/}
            <div className="main">
                <PrivateRoute exact path='/' component={MainPage} isLoggedIn={loginStatus}/>
            </div>
            <div className="login">
                <Route exact path='/login' component={LoginPage}/>
            </div>
        </div>
    )
}

const logger = createLogger();
const sagaMiddleware  = createSagaMiddleware();
var store = ''
if(typeof(window)==='object' && typeof(window.devToolsExtension) !== 'undefined'){
    store = createStore(reducers, compose(applyMiddleware(/*logger, */sagaMiddleware),window.devToolsExtension()))
}
else{
    store = createStore(reducers, applyMiddleware(/*logger,*/ sagaMiddleware));
}
sagaMiddleware.run(rootSaga);

const Root = () =>{
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
}

export default Root;


