import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Form, useSubmit } from 'react-router-dom';

import { clearError } from '@/store/auth/authSlice';
import LoginSchema from '@/validators/auth/LoginSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { RootState, AppDispatch } from '@/store';
import type { IErrorResponse } from '@/types/api/common';
import type { ILoginRequest, ILoginRequestFields } from '@/types/api/auth';

const Login = () => {
    const submit = useSubmit();
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik<ILoginRequest>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async values => {
            submit({ ...values }, { method: 'post' });
        }
    });

    const hasError = (field: ILoginRequestFields) =>
        formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (field: ILoginRequestFields): string =>
        formik.errors[field] || '';

    dispatch(clearError());
    const { error: rawError } = useSelector((state: RootState) => state.auth);
    const error = rawError as IErrorResponse;

    return (
        <>
            <h1 className="text-lg text-center font-medium sm:text-xl">
                Sign in
            </h1>

            <div className="mb-5 text-center sm:mb-7">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="text-primary-500 hover:underline hover:text-primary-600"
                >
                    Register here!
                </Link>
            </div>

            <Form method="post" onSubmit={formik.handleSubmit}>
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

                <button
                    type="submit"
                    className="block w-full p-2 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600 sm:p-4"
                >
                    Login
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

export default Login;
