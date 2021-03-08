import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import authReducer from './redux/reducers/auth'
import alertReducer from './redux/reducers/alert'
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    authState : authReducer,
    alertState : alertReducer
})
const loggerMiddleware = (store)=>{
    return next => {
        return action => {
            return next(action)
        }
    }
}
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, thunk))
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();