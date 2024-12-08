import { useState } from 'react';
import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';
import { Form, Field, Formik, FormikHelpers } from 'formik';

import { useChangePasswordMutation } from '@/redux/user/userApiSlice';
import ChangePasswordSchema from '@/validators/user/ChangePasswordSchema';
import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { IErrorResponse } from '@/types/api/common';
import type { IChangePasswordRequest } from '@/types/api/user';

const ChangePassword = () => {
    const initialValues: IChangePasswordRequest = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleSubmit = async (
        values: IChangePasswordRequest,
        { resetForm }: FormikHelpers<IChangePasswordRequest>
    ) => {
        setErrorMessage(null);

        const { error } = await changePassword(values);

        if (error) {
            if ('status' in error && error.status === HTTP.BAD_REQUEST) {
                const apiErrorResponse = error.data as IErrorResponse;

                setErrorMessage(apiErrorResponse.error);

                return;
            }

            toast.error('Something went wrong...');

            return;
        }

        toast.success('Password changed successfully');

        resetForm();
    };

    return (
        <div className="max-w-96 mx-auto">
            <h1 className="mb-4 text-lg text-center font-medium sm:text-xl">
                Change Password
            </h1>

            <Formik
                initialValues={initialValues}
                validationSchema={ChangePasswordSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="currentPassword" className="text-sm">
                            Current password
                        </label>
                        <Field
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.currentPassword &&
                                errors.currentPassword
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.currentPassword && errors.currentPassword && (
                            <ValidationMessage
                                message={errors.currentPassword}
                            />
                        )}

                        <label htmlFor="newPassword" className="text-sm">
                            New password
                        </label>
                        <Field
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.newPassword && errors.newPassword
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.newPassword && errors.newPassword && (
                            <ValidationMessage message={errors.newPassword} />
                        )}

                        <label htmlFor="confirmNewPassword" className="text-sm">
                            Confirm new password
                        </label>
                        <Field
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.confirmNewPassword &&
                                errors.confirmNewPassword
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.confirmNewPassword &&
                            errors.confirmNewPassword && (
                                <ValidationMessage
                                    message={errors.confirmNewPassword}
                                />
                            )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="block w-full p-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 disabled:bg-green-200 disabled:hover:bg-green-200 sm:p-4"
                        >
                            {isLoading ? 'Processing...' : 'Change password'}
                        </button>

                        {errorMessage && (
                            <div className="text-sm mt-4 text-red-600">
                                {errorMessage}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePassword;
