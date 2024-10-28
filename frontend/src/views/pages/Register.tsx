import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Link, Form, useSubmit } from 'react-router-dom';

import { RootState } from '@/store';
import RegisterSchema from '@/validators/auth/RegisterSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type {
    IRegisterRequest,
    IRegisterRequestFields
} from '@/types/api/auth';
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
            <h1 className="text-xl text-center font-medium">Sign up</h1>

            <div className="mt-1 mb-7 text-center">
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
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (hasError('firstName') ? '!border-red-600' : 'mb-7')
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
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (hasError('lastName') ? '!border-red-600' : 'mb-7')
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
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (hasError('email') ? '!border-red-600' : 'mb-7')
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
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (hasError('password') ? '!border-red-600' : 'mb-7')
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
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (hasError('confirmPassword')
                            ? '!border-red-600'
                            : 'mb-7')
                    }
                />
                {hasError('confirmPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('confirmPassword')}
                    />
                )}

                <button
                    type="submit"
                    className="block w-full p-4 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600"
                >
                    Register
                </button>

                {error?.error ? (
                    <div className="text-sm mt-4 text-red-600">
                        {error.error}
                    </div>
                ) : (
                    <div className="mt-9" />
                )}
            </Form>
        </>
    );
};

export default Register;
