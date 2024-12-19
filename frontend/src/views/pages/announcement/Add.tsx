import { useState } from 'react';

import AddEditForm from '@/components/organisms/announcement/AddEditForm';

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

            <AddEditForm
                initialValues={initialValues}
                categories={categories}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />

            {errorMessage && (
                <div className="text-sm mt-4 text-red-600">{errorMessage}</div>
            )}
        </div>
    );
};

export default AddAnnouncement;
