import {createAction, handleActions} from 'redux-actions';
import { toast } from 'react-toastify';

export const initialState = {
    username:localStorage.getItem('username'),
    loginStatus:false,
    message:'',
    loading: true,
}

//1) Action types (use in saga)
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'user/LOGOUT_FAILURE';
export const CHECK_LOGIN_REQUEST = 'user/CHECK_LOGIN_REQUEST';
export const CHECK_LOGIN_SUCCESS = 'user/CHECK_LOGIN_SUCCESS';
export const CHECK_LOGIN_FAILURE = 'user/CHECK_LOGIN_FAILURE';

export const TEST_API = 'user/TEST_API';

//2) Action Creator
export const login = createAction(LOGIN_REQUEST);
export const logout = createAction(LOGOUT_REQUEST);
export const checkLogin = createAction(CHECK_LOGIN_REQUEST);

export const testing = createAction(TEST_API);
//3) reducers ( all Action types defined is recommended)

export default handleActions({
    [TEST_API] : (state, action) =>{
        return {...state}
    },
    [LOGIN_SUCCESS]:(state, action)=>{
        const {username} = action.payload;
        //not store password
        localStorage.setItem('username', username);
        toast.success("Login Success! Welcome " + username)
        return {...state, username, loginStatus:true, message:''};
    },
    [LOGIN_FAILURE] : (state, action)=>{
        console.error('[LOGIN_FAILURE] : ', action.payload);//err.message. (If some response exist, err.response.message)
        toast.error("Login Failure! Please check id and password again");
        return {...state, loginStatus:false, message:action.payload}
    },
    [LOGOUT_SUCCESS]:(state, action)=>{
        localStorage.removeItem('username');
        toast.success("Logout Success! Bye " + state.username);
        return {...state, username:'', loginStatus:false}
    },
    [LOGOUT_FAILURE] : (state, action)=>{
        console.error('[LOGOUT_FAILURE] : ', action.payload)
        toast.error(action.payload);
        return {...state, message:action.payload}
    },
    [CHECK_LOGIN_REQUEST]: state => ({...state, loading: true }),
    [CHECK_LOGIN_SUCCESS] : (state, action)=>{
        return {...state, loginStatus:true, loading: false}
    },
    [CHECK_LOGIN_FAILURE] : (state, action)=>{
        return {...state, loginStatus:false, loading: false}
    }
}, initialState)
