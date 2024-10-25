import { Link } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';

import RegisterSchema from '@/validators/auth/RegisterSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { IRegisterRequest } from '@/types/api/auth';

const Register = () => {
    const initialValues: IRegisterRequest = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    // @TODO Validation - red border on inputs
    // @TODO Submit of form
    // @TODO Deal with BE errors - show under the submit btn
    // @TODO Success / failure
    // @TODO Show / hide password

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
                validationSchema={RegisterSchema}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            id="firstName"
                            name="firstName"
                            placeholder="First mame"
                            className={
                                'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                                (!(errors.firstName && touched.firstName)
                                    ? 'mb-7'
                                    : '')
                            }
                        />
                        {errors.firstName && touched.firstName && (
                            <ValidationMessage message={errors.firstName} />
                        )}

                        <Field
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                            className={
                                'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                                (!(errors.lastName && touched.lastName)
                                    ? 'mb-7'
                                    : '')
                            }
                        />
                        {errors.lastName && touched.lastName && (
                            <ValidationMessage message={errors.lastName} />
                        )}

                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={
                                'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                                (!(errors.email && touched.email) ? 'mb-7' : '')
                            }
                        />
                        {errors.email && touched.email && (
                            <ValidationMessage message={errors.email} />
                        )}

                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={
                                'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                                (!(errors.password && touched.password)
                                    ? 'mb-7'
                                    : '')
                            }
                        />
                        {errors.password && touched.password && (
                            <ValidationMessage message={errors.password} />
                        )}

                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className={
                                'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                                (!(
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                )
                                    ? 'mb-7'
                                    : '')
                            }
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <ValidationMessage
                                message={errors.confirmPassword}
                            />
                        )}

                        <button
                            type="submit"
                            className="block w-full p-4 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600"
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Register;
