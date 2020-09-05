
import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'

import './App.scss';
import PrivateRoute from './component/common/PrivateRoute';
import { Provider, useSelector, useDispatch } from 'react-redux';
import reducers from './reducers'
import rootSaga from './sagas';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { createStore, compose, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import * as userAction from 'reducers/user'
const App = ({history}) =>{
    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.user.loginStatus)
    const loading = useSelector(state => state.user.loading)
    useEffect(()=>{
        dispatch(userAction.checkLogin());
    },[])
    return(
        <div className="App">
        <ToastContainer/>
            {loading ? "loading..." : 
            <Switch>
                {loginStatus ? null : <Route exact path='/login' component={LoginPage}/>}
                <PrivateRoute path='/' component={MainPage} isLoggedIn={loginStatus}/>
            </Switch>
            }
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


