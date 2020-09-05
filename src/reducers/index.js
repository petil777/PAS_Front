import {combineReducers} from 'redux';

// import someService from './someService'
import user from './user';
import weatherService from './weatherService'
const rootReducer = combineReducers({
    //someService,
    user, weatherService
})
export default rootReducer;