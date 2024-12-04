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

// @TODO Change style
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
        <>
            <h1 className="text-lg text-center font-medium sm:text-xl">
                Change password
            </h1>

            <Form method="post" onSubmit={formik.handleSubmit}>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Current password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('currentPassword')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('currentPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('currentPassword')}
                    />
                )}

                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="New password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('newPassword')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('newPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('newPassword')}
                    />
                )}

                <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    className={
                        'block w-full p-2 bg-primary-50 rounded-lg text-primary-500 outline-2 border-2 border-primary-50 placeholder:text-primary-200 focus:outline-primary-500 sm:p-4 ' +
                        (hasError('confirmNewPassword')
                            ? '!border-red-600'
                            : 'mb-5 sm:mb-7')
                    }
                />
                {hasError('confirmNewPassword') && (
                    <ValidationMessage
                        message={getErrorMessage('confirmNewPassword')}
                    />
                )}

                <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="block w-full p-2 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600 disabled:bg-primary-200 disabled:hover:bg-primary-200 sm:p-4"
                >
                    {state === 'submitting'
                        ? 'Processing...'
                        : 'Change password'}
                </button>

                {errorMessage && (
                    <div className="text-xs mt-2 text-red-600 sm:text-sm sm:mt-4">
                        {errorMessage}
                    </div>
                )}
            </Form>
        </>
    );
};

export default ChangePassword;
