import {createStore} from 'redux';
import getRootReducer from './reducers/index';


export default function getStore(navReducer){
	return store = createStore(getRootReducer(navReducer));
}