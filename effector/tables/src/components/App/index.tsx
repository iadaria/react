import * as React from 'react';
import './App.css';
import { Theater } from '../Theater';
import { useStore } from 'effector-react';
import { $user } from '../../models/auth';
import { Auth } from '../Auth';
import { attachLogger } from 'effector-logger/attach';
import { root } from 'effector-root';
import 'effector-logger/inspector';
import { createInspector } from 'effector-logger/inspector';

attachLogger(root);

createInspector();

export const App = () => {
  const { email } = useStore($user);
  console.log('email', email);
  return email ? <Theater /> : <Auth />;
};
