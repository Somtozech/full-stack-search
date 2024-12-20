import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-8 text-center">
          <h1 className="display-1 text-danger">404</h1>
          <h2>Page Not Found</h2>
          <p className="lead">The page you are looking for does not exist.</p>
          <div className="mt-4">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
