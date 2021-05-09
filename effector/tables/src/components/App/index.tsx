import * as React from 'react';
import 'effector-logger/inspector';
import { useGate, useStore } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import { createInspector } from 'effector-logger/inspector';
import { Auth } from '../Auth';
import { Theater } from '../Theater';
import { root } from 'effector-root';
import { AppGate, Route } from '../../models/app';
import { $router } from '../../models/router';
import './App.css';

attachLogger(root);

createInspector();

export const App = () => {
  useGate(AppGate);

  const [, route] = useStore($router);
  useGate(Route, { name: route ? route : '' });

  if (route === 'theater') {
    return <Theater />
  }

  return <Auth />;
};

/* const { email } = useStore($user);
console.log('email', email);
return email ? <Theater /> : <Auth />; */
