import {
    Form,
    useSubmit,
    useActionData,
    useNavigation
} from 'react-router-dom';
import { useFormik } from 'formik';

import ChangePasswordSchema from '@/validators/user/ChangePasswordSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type {
    IChangePasswordRequest,
    IChangePasswordRequestFields
} from '@/types/api/user';

const ChangePassword = () => {
    const submit = useSubmit();
    const { state } = useNavigation();
    const errorMessage = useActionData() as string;

    const formik = useFormik<IChangePasswordRequest>({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: async values => {
            submit({ ...values }, { method: 'post' });
        }
    });

    const hasError = (field: IChangePasswordRequestFields) =>
        formik.touched[field] === true && !!formik.errors[field];

    const getErrorMessage = (field: IChangePasswordRequestFields): string =>
        formik.errors[field] || '';

    return (
        <div className="max-w-96 mx-auto">
            <h1 className="mb-4 text-lg text-center font-medium sm:text-xl">
                Change Password
            </h1>

            <Form method="post" onSubmit={formik.handleSubmit}>
                <label htmlFor="currentPassword" className="text-sm">
                    Current password
                </label>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                        hasError('currentPassword') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('currentPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('currentPassword')}
                    />
                )}

                <label htmlFor="newPassword" className="text-sm">
                    New password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                        hasError('newPassword') ? '!border-red-600' : 'mb-7'
                    }`}
                />
                {hasError('newPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('newPassword')}
                    />
                )}

                <label htmlFor="confirmNewPassword" className="text-sm">
                    Confirm new password
                </label>
                <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                        hasError('confirmNewPassword')
                            ? '!border-red-600'
                            : 'mb-7'
                    }`}
                />
                {hasError('confirmNewPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('confirmNewPassword')}
                    />
                )}

                <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="block w-full p-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 disabled:bg-green-200 disabled:hover:bg-green-200 sm:p-4"
                >
                    {state === 'submitting'
                        ? 'Processing...'
                        : 'Change password'}
                </button>

                {errorMessage && (
                    <div className="text-sm mt-4 text-red-600">
                        {errorMessage}
                    </div>
                )}
            </Form>
        </div>
    );
};

export default ChangePassword;
