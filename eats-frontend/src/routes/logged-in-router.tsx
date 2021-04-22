import { isLoggedInVar } from '../apollo';

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
  };
  return (
    <div>
      <button onClick={onClick}>Click to logout</button>
    </div>
  );
};
