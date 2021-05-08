import firebase from 'firebase/app';
import {
  $user,
  logout,
  manageEmailProviderFx,
  manageGmailProviderFx,
  signIn,
  gSignIn,
  signUpViaEmailFx,
  $signInForm,
  updateSignInForm,
} from '.';
import { Credentials, IUser } from './types';
import { forward, fromObservable } from 'effector';

const gProvider = new firebase.auth.GoogleAuthProvider();

// Init Effectors

manageGmailProviderFx.use(async () => {
  const { user } = await firebase.auth().signInWithPopup(gProvider);
  if (user === null) {
    throw 'no user found';
  }

  const email = user.email === null ? '' : user.email;
  const fullName = user.displayName === null ? '' : user.displayName;
  const avatar = user.photoURL!.replace('https', 'http');
  return { email, fullName, avatar };
});

manageEmailProviderFx.use(async ({ email, password }) => {
  const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (user === null) {
    throw 'no user found';
  }
  return { email };
});

signUpViaEmailFx.use(async ({ email, password }) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  return { email };
});

// Init Stores

// когда logout событие он его сбросит до default
$user
  .reset(logout)
  .on(
    [manageGmailProviderFx.doneData, manageEmailProviderFx.doneData, signUpViaEmailFx.doneData],
    (_, user: IUser) => user,
  );

$signInForm.on(updateSignInForm, (form, { fieldName, value }) => ({
  ...form,
  [fieldName]: value,
}));

// Init Relations

// Google Sign In
forward({
  from: gSignIn,
  to: manageGmailProviderFx,
});

// Email Sign In
forward({
  from: signIn,
  to: manageEmailProviderFx,
});
