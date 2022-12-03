import React from 'react';
import ReactDOM from 'react-dom/client';
import './BlockMaster.css';
import BlockMaster from './BlockMaster';
import store from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

//movieReducer.dispatch(ADD_MOVIES)
root.render(
  <Provider store={store}>
    <BlockMaster />
  </Provider>
);
