import { useState } from 'react';
import { Form, Field, Formik } from 'formik';

import ValidationMessage from '@/components/atoms/forms/ValidationMessage';
import AddEditAnnouncementSchema from '@/validators/announcement/AddEditAnnouncementSchema';

import type { ICategory } from '@/types/api/category';
import type { IAddEditAnnouncementRequest } from '@/types/api/announcement';

const AddAnnouncement = () => {
    const initialValues: IAddEditAnnouncementRequest = {
        title: '',
        categoryId: '',
        description: '',
        price: '',
        phoneNumber: '',
        image: ''
    };

    // @TODO Loading logic
    const [isLoading] = useState<boolean>(false);
    // @TODO Add function to change
    const [errorMessage] = useState<string | null>(null);

    // @TODO Get categories from API
    const categories: ICategory[] = [
        {
            id: 'e22031b3-4bd9-49e7-b985-a4eb81f3a9ba1',
            name: 'For Sale'
        },
        {
            id: '0f0bf160-79d5-4370-880d-c066efc023be',
            name: 'Services'
        },
        {
            id: 'ec232c26-480d-4d86-9eb6-56905b804fbb',
            name: 'Community'
        },
        {
            id: '343f9cc7-df08-4343-bc9a-2aefd31f9608',
            name: 'Events'
        }
    ];

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
                {({ errors, touched, setFieldValue }) => (
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

                        {/*// @TODO Improve style and behaviour*/}
                        <label htmlFor="categoryId" className="text-sm">
                            Category
                        </label>
                        <Field
                            as="select"
                            id="categoryId"
                            name="categoryId"
                            className={`block w-full p-2 rounded-lg outline-2 bg-white border-2 border-slate-400 focus:outline-black sm:p-4 ${
                                touched.categoryId && errors.categoryId
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        >
                            <option disabled value="">
                                Select Category
                            </option>
                            <>
                                {categories.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </>
                        </Field>
                        {touched.categoryId && errors.categoryId && (
                            <ValidationMessage message={errors.categoryId} />
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
                            Price (optional)
                        </label>
                        <Field
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
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
                            Phone number (optional)
                        </label>
                        <Field
                            id="phoneNumber"
                            name="phoneNumber"
                            className="block w-full p-2 rounded-lg outline-2 border-2 border-slate-400 focus:outline-black sm:p-4"
                        />
                        <div
                            className={`text-sm text-slate-700 ${
                                touched.phoneNumber && errors.phoneNumber
                                    ? '!border-red-600'
                                    : 'mb-7'
                            }`}
                        >
                            Examples: +48 123 123 123 or +48123123123
                        </div>
                        {touched.phoneNumber && errors.phoneNumber && (
                            <ValidationMessage message={errors.phoneNumber} />
                        )}

                        <label htmlFor="image" className="text-sm">
                            Image (optional)
                        </label>
                        {/*// @TODO Fix eslint issue*/}
                        <input
                            type="file"
                            name="image"
                            accept="image/png, image/jpeg, image/gif"
                            className={
                                !(touched.image && errors.image) ? 'mb-7' : ''
                            }
                            onChange={e => {
                                setFieldValue('image', e.target.files[0] || '');
                            }}
                        />
                        {touched.image && errors.image && (
                            <ValidationMessage message={errors.image} />
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="block w-full p-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 disabled:bg-green-200 disabled:hover:bg-green-200 sm:p-4"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
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

export default AddAnnouncement;
