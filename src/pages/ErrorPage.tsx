import { useRouteError } from 'react-router-dom';

type ErrorResponse = {
  statusText: string;
  message?: string;
};

const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;
  return (
    <div className="container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
