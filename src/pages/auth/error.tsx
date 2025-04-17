import { Link } from "react-router";

export default function Error() {
  const searchParams = new URLSearchParams(location.search);
  const errorMsg = searchParams.get("error");

  return (

          <div>
            <h1 className="text-2xl font-bold">Oops, something went wrong.</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {errorMsg
                ? `Error: ${decodeURIComponent(errorMsg)}`
                : "An unexpected error occurred."}
            </p>
            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm underline text-primary">
                Back to Login
              </Link>
            </div>
          </div>

  );
}
