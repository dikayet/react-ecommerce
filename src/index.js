import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
	cart: cartReducer
});

const store = createStore(rootReducer);


const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
