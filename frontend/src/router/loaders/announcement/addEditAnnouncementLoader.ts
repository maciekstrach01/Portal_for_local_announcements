import { toast } from 'react-toastify';

import { store } from '@/redux';
import { categoryApiSlice } from '@/redux/category/categoryApiSlice';

import type { ICategory } from '@/types/api/category';

export const addEditAnnouncementLoader = async (): Promise<ICategory[]> => {
    try {
        const response = await store
            .dispatch(categoryApiSlice.endpoints.getCategories.initiate())
            .unwrap();

        return response;
    } catch {
        toast.error('Error while fetching categories');

        return [];
    }
};
