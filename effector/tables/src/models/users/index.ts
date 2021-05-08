//import { createEffect, createEvent, createStore } from 'effector';
import { createEffect, createEvent, createStore } from 'effector-root';
import { FirebaseUser, UsersMap } from './types';

// Events
export const changeUserTable = createEvent<string>();
export const updateUsers = createEvent<UsersMap>();

// Effects
export const fetchUsersFx = createEffect<void, UsersMap>();
//export const addUserFx = createEffect<FirebaseUser, string[]>();
export const addUserFx = createEffect<FirebaseUser, unknown>();
export const updateUsersTableFx = createEffect<{ id: string; tableID: string }, unknown>();
export const deleteUserFx = createEffect<string, unknown>();

// Stores
export const $firebaseUsers = createStore<UsersMap>({});

export const $users = $firebaseUsers.map((fUsers) => Object.keys(fUsers).map((id) => fUsers[id]));

export const $usersByEmail = $firebaseUsers.map((fUsers) => {
  return Object.keys(fUsers).reduce((usersByEmail, id) => {
    const email = fUsers[id].email;
    return {
      [email]: {
        id,
        ...fUsers[id],
      },
      ...usersByEmail,
    };
  }, {});
});
