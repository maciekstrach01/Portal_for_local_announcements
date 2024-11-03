import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Link, Form, useSubmit } from 'react-router-dom';

import RegisterSchema from '@/validators/auth/RegisterSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type {
    IRegisterRequest,
    IRegisterRequestFields
} from '@/types/api/auth';
import type { RootState } from '@/store';
import type { IErrorResponse } from '@/types/api/common';

const Register = () => {
    const submit = useSubmit();

    const formik = useFormik<IRegisterRequest>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async values => {
            submit({ ...values }, { method: 'post' });
        }
    });

    const hasError = (field: IRegisterRequestFields) =>
        formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (field: IRegisterRequestFields): string =>
        formik.errors[field] || '';

    const { error: rawError } = useSelector((state: RootState) => state.auth);
    const error = rawError as IErrorResponse;

    return (
        <>
            <h1 className="text-lg text-center font-medium sm:text-xl">
                Sign up
            </h1>

            <div className="mb-5 text-center sm:mb-7">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="text-primary-500 hover:underline hover:text-primary-600"
                >
                    Login here!
                </Link>
            </div>

            <Form method="post" onSubmit={formik.handleSubmit}>
                <input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('firstName')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('firstName') && (
                    <ValidationMessage message={getErrorMessage('firstName')} />
                )}

                <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('lastName')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('lastName') && (
                    <ValidationMessage message={getErrorMessage('lastName')} />
                )}

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('email') ? '!border-red-600' : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('email') && (
                    <ValidationMessage message={getErrorMessage('email')} />
                )}

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('password')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('password') && (
                    <ValidationMessage message={getErrorMessage('password')} />
                )}

                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('confirmPassword')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('confirmPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('confirmPassword')}
                    />
                )}

                <button
                    type="submit"
                    className="block w-full p-2 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600 sm:p-4"
                >
                    Register
                </button>

                {error?.error ? (
                    <div className="text-xs mt-2 text-red-600 sm:text-sm sm:mt-4">
                        {error.error}
                    </div>
                ) : (
                    <div className="mt-6 sm:mt-9" />
                )}
            </Form>
        </>
    );
};

export default Register;
