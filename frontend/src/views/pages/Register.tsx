import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <div className="my-8">
                <h1 className="text-3xl">Sign up </h1>

                <p className="mt-1">
                    If you already have an account
                    <br />
                    You can{' '}
                    <Link
                        to="/login"
                        className="text-primary-500 hover:underline hover:text-primary-600"
                    >
                        Login here!
                    </Link>
                </p>
            </div>

            <input
                type="text"
                placeholder="First name"
                className="block w-full my-8 p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500"
            />

            <input
                type="text"
                placeholder="Last name"
                className="block w-full my-8 p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500"
            />

            <input
                type="email"
                placeholder="Email"
                className="block w-full my-8 p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500"
            />

            <input
                type="password"
                placeholder="Password"
                className="block w-full my-8 p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500"
            />

            <input
                type="password"
                placeholder="Confirm password"
                className="block w-full my-8 p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500"
            />

            <button
                type="submit"
                className="block w-full my-8 p-4 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600"
            >
                Register
            </button>
        </>
    );
};

export default Register;
