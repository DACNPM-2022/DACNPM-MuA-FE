import Axios from 'axios'
import {ADMIN_SIGNIN_REQUEST,ADMIN_SIGNIN_FAIL,ADMIN_SIGNIN_SUCCESS,ADMIN_SIGNOUT,USER_LIST_FAIL,USER_LIST_REQUEST,USER_LIST_SUCCESS,CREATE_USER_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS} from '../constants/adminConstants'



export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: ADMIN_SIGNIN_REQUEST,
        payload: { email, password }
    });
    try {
        const {data} = await Axios.post('/api/users/signin', {email, password});
        if(data.isSuperAdmin === false){
            dispatch({
                type: ADMIN_SIGNIN_FAIL,
                payload:"Not a Admin"
                    
            })
        }
        else{
            dispatch({
                type: ADMIN_SIGNIN_SUCCESS,
                payload: data,
            })
            localStorage.setItem('adminInfo', JSON.stringify(data));
        }
    } catch (error) {
        dispatch({
            type: ADMIN_SIGNIN_FAIL,
            payload:
                error.respone && error.respone.data.message
                ? error.respone.data.message 
                : error.message,
        })
        console.log(error);
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('adminInfo');
    
    dispatch({
        type: ADMIN_SIGNOUT,
    })
}

export const listUser = () => async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/users');
        dispatch({ 
            type: USER_LIST_SUCCESS, 
            payload: data,
        });
    } catch (error) {
        dispatch({ 
            type: USER_LIST_FAIL,
            payload: error.message,
        })
    }
}
export const createUser = (user) => async(dispatch) => {
    dispatch({
        type: CREATE_USER_REQUEST,
        payload: user,
    })
    try {
    
        const {data} = await Axios.post('/api/admin/users/create', user);
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: data.user,
        })
        
        
    } catch (error) {
        dispatch({
            type: CREATE_USER_FAIL,
            payload: 
                error.respone && error.respone.message
                ? error.respone.data.message
                : error.message,
        })
    }
}

