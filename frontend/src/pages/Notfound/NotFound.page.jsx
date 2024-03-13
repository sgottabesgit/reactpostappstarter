import { Link } from 'react-router-dom';
import styles from './NotFound.page.module.css'; // Import CSS module for styling

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundText}>
        <h1 className={styles.notFoundHeading}>Oops! Page not found</h1>
        <p className={styles.notFoundDescription}>
          Looks like you've wandered off the beaten path!
        </p>
        <Link to="/" className={styles.notFoundLink}>Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
