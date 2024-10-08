import { configureStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

const initialState = {};

const middleware = [thunk];

const store = configureStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;