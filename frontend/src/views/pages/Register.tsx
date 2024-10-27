import { useFormik } from 'formik';
import { Link, useSubmit } from 'react-router-dom';

import { store } from '@/store';
import { register } from '@/store/auth/authActions';
import RegisterSchema from '@/validators/auth/RegisterSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { IRegisterRequest } from '@/types/api/auth';
import type { ActionFunctionArgs } from 'react-router-dom';

export const action = async ({
    request
}: ActionFunctionArgs<IRegisterRequest>): Promise<null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        // @ts-ignore
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

    // @TODO Validation - red border on inputs
    // @TODO Submit of form
    // @TODO Deal with BE errors - show under the submit btn
    // @TODO Success / failure
    // @TODO Show / hide password

    const submit = useSubmit();

    const formik = useFormik<IRegisterRequest>({
        initialValues,
        validationSchema: RegisterSchema,
        onSubmit: async values => {
            // @ts-ignore
            submit(values, { method: 'post' });
        }
    });

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
            <form method="post" onSubmit={formik.handleSubmit}>
                <input
                    id="firstName"
                    name="firstName"
                    placeholder="First mame"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (!(formik.errors.firstName && formik.touched.firstName)
                            ? 'mb-7'
                            : '')
                    }
                />
                {formik.errors.firstName && formik.touched.firstName && (
                    <ValidationMessage message={formik.errors.firstName} />
                )}

                <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (!(formik.errors.lastName && formik.touched.lastName)
                            ? 'mb-7'
                            : '')
                    }
                />
                {formik.errors.lastName && formik.touched.lastName && (
                    <ValidationMessage message={formik.errors.lastName} />
                )}

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (!(formik.errors.email && formik.touched.email)
                            ? 'mb-7'
                            : '')
                    }
                />
                {formik.errors.email && formik.touched.email && (
                    <ValidationMessage message={formik.errors.email} />
                )}

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (!(formik.errors.password && formik.touched.password)
                            ? 'mb-7'
                            : '')
                    }
                />
                {formik.errors.password && formik.touched.password && (
                    <ValidationMessage message={formik.errors.password} />
                )}

                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-4 bg-primary-50 rounded-lg text-primary-500 placeholder:text-primary-200 focus:outline-primary-500 ' +
                        (!(
                            formik.errors.confirmPassword &&
                            formik.touched.confirmPassword
                        )
                            ? 'mb-7'
                            : '')
                    }
                />
                {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                        <ValidationMessage
                            message={formik.errors.confirmPassword}
                        />
                    )}

                <button
                    type="submit"
                    className="block w-full p-4 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600"
                >
                    Register
                </button>
            </form>
        </>
    );
};

export default Register;
