import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { fetchUsersFx } from '../users';

import { app, AppGate, initAppFx, showErrorFx } from '.';
import { checkAuth } from '../auth';
import {
  appId,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  apiKey,
  messagingSenderId,
} from '../../config/firebase.json';
import { forward } from 'effector';
import { Route } from './index';

// Init Effects

initAppFx.use(
  async ({
    appId,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    apiKey,
    messagingSenderId,
  }) => {
    await firebase.initializeApp({
      appId,
      projectId,
      apiKey,
      messagingSenderId,
      authDomain,
      databaseURL,
      storageBucket,
    });
    firebase.firestore();
  },
);

showErrorFx.use((text) => alert(text));

// Launch Effects

initAppFx({
  appId,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  apiKey,
  messagingSenderId,
});

// Init Connections

forward({
  from: AppGate.open,
  to: [checkAuth],
});

Route.state.updates.watch(({ name }) => {
  // eslint-disable-next-line no-restricted-globals
  history.pushState({}, '', `/${name}`);
});

app.onCreateEffect((fx) => {
  fx.failData.watch((error) => {
    console.error(`Error in ${fx.shortName}`);
    console.log(error);
  });
});
