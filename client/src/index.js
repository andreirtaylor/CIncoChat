import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import {createStore , applyMiddleware} from 'redux'
import {Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

import 'foundation-sites/dist/css/foundation.min.css';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))} >
      <Routes />
    </Provider>, document.getElementById('root'));
  registerServiceWorker();
});
