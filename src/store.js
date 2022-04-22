import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { createOrderReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { adminSigninReducer,userlistReducer } from './reducers/Admin/adminReducers';
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAdress')
            ? JSON.parse(localStorage.getItem('shippingAdress'))
            : {},
        paymentMethod: 'Paypal',
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    adminSignin:{
        adminInfo: localStorage.getItem('adminInfo')
        ? JSON.parse(localStorage.getItem('adminInfo'))
        : null,
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: createOrderReducer,
    orderDetails: orderDetailsReducer,
    adminSignin:adminSigninReducer,
    usersList:userlistReducer,
    userCreate:createOrderReducer,
    orderPay: orderPayReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;