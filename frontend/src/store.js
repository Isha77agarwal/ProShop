import { applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import { productListReducer,  productDetailsReducer } from "./reducers/productListReducer"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer } from "./reducers/userReducers"

const reducer = {
    productList: productListReducer,
    productDetails :  productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
}

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState, 
    middleware: middleware
})

export default store