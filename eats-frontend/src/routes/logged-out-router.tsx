import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAccount from '../pages/create-account';
import { Login } from '../pages/login';

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch('email'));
  };

  const onInvalid = () => {
    console.log('can not create acccount');
  };

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
    /* <div>
      <h1>Logged Out</h1>
      <form onSubmit={hundleSubmit(onSubmit)}>
        <div>
          <input
            {...register('email', {
              required: true,
            })}
            name="email"
            type="email"
            required
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="font-bold text-red-600">{errors.email?.message}</span>
          )}
          <input
            {...register('password', { required: true })}
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <button className="bg-yellow">Click to login</button>
      </form>
    </div> */
  );
};
function hundleSubmit(
  onSubmit: () => void
): import('react').FormEventHandler<HTMLFormElement> | undefined {
  throw new Error('Function not implemented.');
}
