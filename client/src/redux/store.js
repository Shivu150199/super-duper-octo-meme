import {legacy_createStore} from 'redux'
import authReducers from './reducers';

const store=legacy_createStore(authReducers)


export default store;