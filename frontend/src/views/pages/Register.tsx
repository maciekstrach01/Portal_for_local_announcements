import {
    Form,
    Formik,
    Field,
} from 'formik';
import { Link } from 'react-router-dom';

import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { RegisterRequest } from '@/types/api/auth';

const Register = () => {
    const areValidationErrors = false;

    const initialValues: RegisterRequest = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    // @TODO Validation - red border on inputs
    // @TODO FE Validation
    // @TODO Submit of form
    // @TODO Success / failure

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

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form>
                    <Field
                        id="firstName"
                        name="firstName"
                        placeholder="First mame"
                        className={
                            'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                            (!areValidationErrors ? 'mb-7' : '')
                        }
                    />
                    {areValidationErrors && (
                        <ValidationMessage message="This field is required" />
                    )}

                    <Field
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        className={
                            'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                            (!areValidationErrors ? 'mb-7' : '')
                        }
                    />
                    {areValidationErrors && (
                        <ValidationMessage message="This field is required" />
                    )}

                    <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className={
                            'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                            (!areValidationErrors ? 'mb-7' : '')
                        }
                    />
                    {areValidationErrors && (
                        <ValidationMessage message="This field is required" />
                    )}

                    <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className={
                            'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                            (!areValidationErrors ? 'mb-7' : '')
                        }
                    />
                    {areValidationErrors && (
                        <ValidationMessage message="This field is required" />
                    )}

                    <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
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
                </Form>
            </Formik>
        </>
    );
};

export default Register;
