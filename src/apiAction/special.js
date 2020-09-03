import api from 'apiAction';

export const specialAction = () =>{
    return api.get('/test');
}