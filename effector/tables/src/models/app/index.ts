import { createDomain, createEffect } from 'effector';
import { createGate } from 'effector-react';
import { IConfig } from './types';

export const app = createDomain();

export const initAppFx = app.createEffect<IConfig, unknown>();

export const showErrorFx = app.createEffect<string, unknown>();

export const AppGate = createGate();

export const Route = createGate<{ name: string }>();
