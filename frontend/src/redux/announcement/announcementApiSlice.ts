import { apiSlice } from '@/redux/apiSlice';

import type { IAddEditAnnouncementResponse } from '@/types/api/announcement';

export const announcementApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        store: builder.mutation<IAddEditAnnouncementResponse, FormData>({
            query: body => ({
                url: '/v1/announcement',
                method: 'POST',
                body
            })
        })
    })
});

export const { useStoreMutation } = announcementApiSlice;
