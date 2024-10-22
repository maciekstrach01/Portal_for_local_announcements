import { Link } from 'react-router-dom';

import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

const Register = () => {
    const areValidationErrors = false;

    return (
        <>
            <h1 className="text-3xl">Sign up </h1>

            <p className="mt-1 mb-7">
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

            <input
                type="text"
                placeholder="First name"
                className={
                    'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                    (!areValidationErrors ? 'mb-7' : '')
                }
            />

            {areValidationErrors && (
                <ValidationMessage message="This field is required" />
            )}

            <input
                type="text"
                placeholder="Last name"
                className={
                    'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                    (!areValidationErrors ? 'mb-7' : '')
                }
            />

            {areValidationErrors && (
                <ValidationMessage message="This field is required" />
            )}

            <input
                type="email"
                placeholder="Email"
                className={
                    'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                    (!areValidationErrors ? 'mb-7' : '')
                }
            />

            {areValidationErrors && (
                <ValidationMessage message="This field is required" />
            )}

            <input
                type="password"
                placeholder="Password"
                className={
                    'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                    (!areValidationErrors ? 'mb-7' : '')
                }
            />

            {areValidationErrors && (
                <ValidationMessage message="This field is required" />
            )}

            <input
                type="password"
                placeholder="Confirm password"
                className={
                    'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                    (!areValidationErrors ? 'mb-7' : '')
                }
            />

            {areValidationErrors && (
                <ValidationMessage message="This field is required" />
            )}

            <button
                type="submit"
                className="block w-full p-4 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600"
            >
                Register
            </button>
        </>
    );
};

export default Register;
