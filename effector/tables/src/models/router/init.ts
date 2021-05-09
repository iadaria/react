/** Init Stores */

import { sample } from 'effector';
import { $router, redirect } from '.';
import { $user } from '../auth';
import { IUser } from '../auth/types';

$router.on(redirect, (existRoutes, newlink) => [...existRoutes, newlink]);

sample({
  source: $user,
  fn: (user: IUser) => (user.email ? 'theater' : ''),
  target: redirect,
});
