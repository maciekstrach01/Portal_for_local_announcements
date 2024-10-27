import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Link, Form, useSubmit } from 'react-router-dom';

import { store, RootState } from '@/store';
import { register } from '@/store/auth/authActions';
import RegisterSchema from '@/validators/auth/RegisterSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { IErrorResponse } from '@/types/api/common';
import type { IRegisterRequest } from '@/types/api/auth';
import type { ActionFunctionArgs } from 'react-router-dom';

// @TODO Refactor hasError and getError
// @TODO Refactor BE error
export const action = async ({
    request
}: ActionFunctionArgs<IRegisterRequest>): Promise<null> => {
    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const data: IRegisterRequest = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    };

    // @TODO Do not redirect on error!
    try {
        await store.dispatch(register(data));

        return null;
    } catch (error) {
        console.error(error);

        throw error;
    }
};

const Register = () => {
    const initialValues: IRegisterRequest = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const submit = useSubmit();

    const formik = useFormik<IRegisterRequest>({
        initialValues,
        validationSchema: RegisterSchema,
        onSubmit: async values => {
            // @ts-ignore
            submit(values, { method: 'post' });
        }
    });

    const hasError = (
        field:
            | 'firstName'
            | 'lastName'
            | 'email'
            | 'password'
            | 'confirmPassword'
    ) => formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (
        field:
            | 'firstName'
            | 'lastName'
            | 'email'
            | 'password'
            | 'confirmPassword'
    ): string => formik.errors[field] || '';

    const { error: rawError } = useSelector((state: RootState) => state.auth);
    const error = rawError as IErrorResponse;

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

            <Form method="post" onSubmit={formik.handleSubmit}>
                <input
                    id="firstName"
                    name="firstName"
                    placeholder="First mame"
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

                {error?.error && (
                    <p className="mt-7 text-red-600">{error.error}</p>
                )}
            </Form>
        </>
    );
};

export default Register;
