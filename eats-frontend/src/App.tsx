import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from './routes/logged-in-router';
import { LoggedOutRouter } from './routes/logged-out-router';
import { isLoggedInVar } from './apollo';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;

/*
const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);
const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`; */
