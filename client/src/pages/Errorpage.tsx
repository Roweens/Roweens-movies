import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export function Errorpage() {
  const error: any = useRouteError();
  console.log(error);

  return (
    <div className="error-page">
      <h1>Error</h1>
      <p>An unexpected error has occurred.</p>
      {isRouteErrorResponse(error) ? (
        <p>
          <i>
            {error.status} {error.statusText}
          </i>
        </p>
      ) : (
        <p>{error.message || 'Unknown Error'}</p>
      )}
      <Link to={'/'}>Go Home</Link>
    </div>
  );
}
