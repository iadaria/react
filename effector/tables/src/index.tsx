import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import reportWebVitals from './reportWebVitals';

import '../src/models/init';

const rootElement = document.getElementById('root');

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./components/App', function () {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
