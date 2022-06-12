import { applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import { productListReducer,  productDetailsReducer } from "./reducers/productListReducer"
import { cartReducer } from "./reducers/cartReducers"

const reducer = {
    productList: productListReducer,
    productDetails :  productDetailsReducer,
    cart: cartReducer,
}

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {cartItems: cartItemsFromStorage}
}

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState, 
    middleware: middleware
})

export default store