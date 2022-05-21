import { applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import { productListReducer } from "./reducers/productListReducer"

const reducer = {
    productList: productListReducer,
}

const initialState = {}

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState, 
    middleware: middleware
})

export default store