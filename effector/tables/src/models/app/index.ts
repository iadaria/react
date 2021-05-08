import { createEffect } from 'effector';
import { IConfig } from './types';

export const initAppFx = createEffect<IConfig, unknown>();
