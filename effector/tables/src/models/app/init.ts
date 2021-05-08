import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { initAppFx } from '../app';
import {
  appId,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  apiKey,
  messagingSenderId,
} from '../../config/firebase.json';

initAppFx.use(async ({ appId, authDomain, databaseURL, projectId, storageBucket, apiKey, messagingSenderId }) => {
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
});

initAppFx({
  appId,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  apiKey,
  messagingSenderId,
});
