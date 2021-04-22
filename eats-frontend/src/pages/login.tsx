import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [loginMutation, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: { email, password },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Login In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1 mt-5 px-5">
          <input
            {...register('email', {
              required: 'Email is required',
            })}
            name="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && <FormError errorMessage={errors.email.message} />}
          <input
            {...register('password', { required: 'Passwrod is requried', minLength: 4 })}
            type="password"
            name="password"
            placeholder="Password"
            className="input mt-2"
          />
          {errors.password?.message && <FormError errorMessage={errors.password.message} />}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <button className="btn">Log in</button>
        </form>
      </div>
    </div>
  );
};
