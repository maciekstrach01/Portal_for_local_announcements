import { useState } from 'react';
import { Form, Field, Formik } from 'formik';

import ValidationMessage from '@/components/atoms/forms/ValidationMessage';

import type { IAddEditAnnouncementRequest } from '@/types/api/announcement';
import AddEditAnnouncementSchema from '@/validators/announcement/AddEditAnnouncementSchema.ts';

const AddAnnouncement = () => {
    // @TODO Category
    const initialValues: IAddEditAnnouncementRequest = {
        title: '',
        description: '',
        price: '',
        phoneNumber: ''
    };

    // @TODO Get categories from API

    const [isLoading] = useState<boolean>(false);
    // @TODO Error logic

    // @TODO Submit logic
    const handleSubmit = async (values: IAddEditAnnouncementRequest) => {
        // @TODO Tmp
        console.log(values);

        // setErrorMessage(null);
        //
        // try {
        //     await changePassword(values).unwrap();
        //
        //     toast.success('Password changed successfully');
        //
        //     resetForm();
        // } catch (error) {
        //     const fetchError = error as FetchBaseQueryError;
        //
        //     if (
        //         'status' in fetchError &&
        //         fetchError.status === HTTP.BAD_REQUEST
        //     ) {
        //         const apiErrorResponse = fetchError.data as IErrorResponse;
        //
        //         setErrorMessage(apiErrorResponse.error);
        //
        //         return;
        //     }
        //
        //     toast.error('Something went wrong...');
        // }
    };

    return (
        <div className="max-w-96 mx-auto">
            <h1 className="mb-4 text-lg text-center font-medium sm:text-xl">
                Add announcement
            </h1>

            <Formik
                initialValues={initialValues}
                validationSchema={AddEditAnnouncementSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="title" className="text-sm">
                            Title
                        </label>
                        <Field
                            id="title"
                            name="title"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.title && errors.title
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.title && errors.title && (
                            <ValidationMessage message={errors.title} />
                        )}

                        <label htmlFor="description" className="text-sm">
                            Description
                        </label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.description && errors.description
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.description && errors.description && (
                            <ValidationMessage message={errors.description} />
                        )}

                        <label htmlFor="price" className="text-sm">
                            Price
                        </label>
                        <Field
                            id="price"
                            name="price"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.price && errors.price
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.price && errors.price && (
                            <ValidationMessage message={errors.price} />
                        )}

                        <label htmlFor="phoneNumber" className="text-sm">
                            Phone number
                        </label>
                        <Field
                            id="phoneNumber"
                            name="phoneNumber"
                            className={`block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.phoneNumber && errors.phoneNumber
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <ValidationMessage message={errors.phoneNumber} />
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="block w-full p-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 disabled:bg-green-200 disabled:hover:bg-green-200 sm:p-4"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>

                        {/*// @TODO Error message */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddAnnouncement;
