import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div>
      <h1>OOPS! Page not found</h1>
      <p>Looks like you've wandered off the beaten path.</p>
      <Link to="/" className="not-found-link">
        Go back to Home
      </Link>

    </div>
  );
};

export default NotFound;
