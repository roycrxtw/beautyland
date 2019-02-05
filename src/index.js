
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

function Root(props) {
  return (
    <Provider store={store}>
      <Router basename='/'>
        <App />
      </Router>
    </Provider>
  );
}

ReactDOM.render( <Root />, document.getElementById('root'));
registerServiceWorker();
