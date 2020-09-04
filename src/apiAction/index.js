import axios from 'axios';

const api = axios.create({withCredentials : true})

export const login = (payload) =>{
    const {username, password} = payload;
    //{username:username, password:password}
    // return api.post('/adduser', {username, password});
    return api.post('/login', {username, password})
}
export const isLoggedIn = () =>{
    return api.get('/logincheck');
}
export const logout = () =>{
    return api.post('/logout', {});
}
// export const google_login_post = () =>{
//     return api.post('/')
// }
export const testapi = () =>{
    // return api.get('/test');
    // return api.post('/login', {username:'jjj', password:"1234"})
    return api.post('/addUser', {username:'jjjk', password:'12', rank:'mvp'})
    // return api.post('/auth/google/login');
}
export default api;