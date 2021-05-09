import firebase from 'firebase/app';
import { forward, guard, merge, sample, Store } from 'effector';
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
  checkAuthFx,
  checkAuth,
  dropUserAuthFx,
  restoredAuth,
} from '.';
import { IUser } from './types';
import { $tableCapacity, $tablesCount } from '../tables';
import { $usersByEmail, $usersCount, deleteUserFx, addUserFx } from '../users';
import { showErrorFx } from '../app';
import { UsersMap } from '../users/types';

const gProvider = new firebase.auth.GoogleAuthProvider();

/** Init Effectors */

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
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  if (user === null) {
    throw 'no user found';
  }
  return { email };
});

signUpViaEmailFx.use(async ({ email, password }) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  return { email };
});

checkAuthFx.use(() => {
  firebase.auth().onAuthStateChanged((value) => {
    if (value !== null) {
      checkAuth(value as IUser);
    }
  });
});

dropUserAuthFx.use(async () => {
  await firebase.auth().signOut();
});

/** Init Store */

$user
  // когда logout событие он его сбросит до default
  .reset(logout)
  .on(
    [
      manageGmailProviderFx.doneData,
      manageEmailProviderFx.doneData,
      signUpViaEmailFx.doneData,
      //restoredAuth,
    ],
    (_, user: IUser) => user,
  )
  .on(addUserFx.doneData, (user, [_, id]) => ({
    ...user,
    id,
  }));

$signInForm.on(updateSignInForm, (form, { fieldName, value }) => ({
  ...form,
  [fieldName]: value,
}));

/** Init Protections & Connections */

const $canUserEnter: Store<boolean> = sample({
  source: {
    count: $tablesCount,
    capacity: $tableCapacity,
  },
  clock: $usersCount,
  // source, clock
  fn: ({ count, capacity }, usersCount) => count * capacity > usersCount,
});

const $cannotUserEnter = $canUserEnter.map((can) => !can);

guard({
  source: gSignIn,
  filter: $canUserEnter,
  target: manageGmailProviderFx,
});

guard({
  source: signIn,
  filter: $canUserEnter,
  target: manageEmailProviderFx,
});

guard({
  source: merge([signIn, gSignIn]).map(
    () => 'Theater is full! Try to login later.',
  ),
  filter: $cannotUserEnter,
  target: showErrorFx,
});

forward({
  from: manageEmailProviderFx.fail.filterMap(({ params, error = {} }) => {
    if (error.code && error.code.includes('user-not-found')) {
      return params;
    }
  }),
  to: signUpViaEmailFx,
});

const foundPrevLoginUser = sample({
  source: $usersByEmail,
  clock: [
    manageEmailProviderFx.doneData,
    manageGmailProviderFx.doneData,
    signUpViaEmailFx.doneData,
  ],
  fn: (users: UsersMap, user) => users[user.email],
});

sample({
  source: guard({
    source: foundPrevLoginUser,
    filter: Boolean,
  }),
  fn: (user) => user.id!, // user.id должно быть не null т/е !
  target: deleteUserFx,
});

forward({
  from: logout,
  to: dropUserAuthFx,
});

// Вызывается restoreAuth после срабатывания restoreAuth
// но только для авторизированного пользователя
forward({
  from: checkAuth.filterMap((user: IUser | unknown) => {
    if (user !== null) {
      return user;
    }
  }),
  to: restoredAuth,
});

/** Old */

/* Google Sign In
forward({
  from: gSignIn,
  to: manageGmailProviderFx,
});

// Email Sign In
forward({
  from: signIn,
  to: manageEmailProviderFx,
}); */
