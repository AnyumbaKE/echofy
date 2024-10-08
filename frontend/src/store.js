import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : false,
});

export default store;