import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/client/react';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';
import { client } from './apollo';

function render() {
    ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
      <App />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

}

if (module.hot) {
  module.hot.accept('./App', function() {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
