//import { createEffect, createEvent, createStore } from 'effector';
import { createEffect, createEvent, createStore } from 'effector-root';
import { Credentials, IUser } from './types';

// Events

export const gSignIn = createEvent();
export const signIn = createEvent<Credentials>();
export const logout = createEvent<string>('logout');
export const updateSignInForm = createEvent<{ value: string; fieldName: string }>();

// Effects

export const manageGmailProviderFx = createEffect<void, IUser>();
export const manageEmailProviderFx = createEffect<Credentials, IUser>();
export const signUpViaEmailFx = createEffect<Credentials, { email: string }>();

// Stores

export const $user = createStore<IUser>({
  email: '',
});

export const $signInForm = createStore<Credentials>({
  email: '',
  password: '',
});
