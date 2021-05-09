//import { createEffect, createEvent, createStore } from 'effector';
import { createEffect, createEvent, createStore } from 'effector-root';
import { app } from '../app';
import { Credentials, IUser } from './types';

// Events

export const gSignIn = app.createEvent();

export const signIn = app.createEvent<Credentials>();

export const logout = app.createEvent<string>('logout');

export const updateSignInForm = app.createEvent<{
  value: string;
  fieldName: string;
}>();

export const checkAuth = app.createEvent<IUser | unknown>();

export const restoredAuth = app.createEvent<IUser | unknown>();

// Effects

export const manageGmailProviderFx = app.createEffect<void, IUser>();

export const manageEmailProviderFx = app.createEffect<Credentials, IUser>();

export const signUpViaEmailFx = app.createEffect<
  Credentials,
  { email: string }
>();

export const checkAuthFx = app.createEffect<void, unknown>();

export const dropUserAuthFx = app.createEffect<string, unknown>();

// Stores

export const $user = app.createStore<IUser>({
  email: '',
});

export const $signInForm = app.createStore<Credentials>({
  email: '',
  password: '',
});
