import { useRouteError, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="errorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
