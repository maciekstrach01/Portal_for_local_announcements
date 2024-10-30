import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>Page not found</h1>

            <Link
                to="/"
                className="text-primary-500 hover:underline hover:text-primary-600"
            >
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound;
