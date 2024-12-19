import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { StatusCodes as HTTP } from 'http-status-codes';

import AddEditForm from '@/components/organisms/announcement/AddEditForm';
import { useStoreMutation } from '@/redux/announcement/announcementApiSlice';

import type { ICategory } from '@/types/api/category';
import type { IErrorResponse } from '@/types/api/common';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { IAddEditAnnouncementRequest } from '@/types/api/announcement';

const AddAnnouncement = () => {
    const categories = useLoaderData() as ICategory[];

    // @TODO Reset file input inside Add Edit Form element
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initialValues: IAddEditAnnouncementRequest = {
        title: '',
        categoryId: '',
        description: '',
        price: '',
        phoneNumber: '',
        image: ''
    };

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [store, { isLoading }] = useStoreMutation();

    const handleSubmit = async (
        values: IAddEditAnnouncementRequest,
        { resetForm }: FormikHelpers<IAddEditAnnouncementRequest>
    ) => {
        setErrorMessage(null);

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                formData.append(key, value);
            }
        });

        try {
            await store(formData).unwrap();

            toast.success('Announcement added successfully');

            resetForm();

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            const fetchError = error as FetchBaseQueryError;

            if (
                'status' in fetchError &&
                fetchError.status === HTTP.BAD_REQUEST
            ) {
                const apiErrorResponse = fetchError.data as IErrorResponse;

                setErrorMessage(apiErrorResponse.error);

                return;
            }

            toast.error('Something went wrong...');
        }
    };

    return (
        <div className="max-w-96 mx-auto">
            <h1 className="mb-4 text-lg text-center font-medium sm:text-xl">
                Add announcement
            </h1>

            <AddEditForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                categories={categories}
                fileInputRef={fileInputRef}
                isLoading={isLoading}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default AddAnnouncement;
