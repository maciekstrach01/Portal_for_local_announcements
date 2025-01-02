import { apiSlice } from '@/redux/apiSlice';

import type {
    IAnnouncement,
    IAnnouncementIndexResponse
} from '@/types/api/announcement';
import { IIndexQuery } from '@/types/api/common';

export const announcementApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnnouncements: builder.query<
            IAnnouncementIndexResponse,
            IIndexQuery
        >({
            query: ({ page = 0, size = 10 } = {}) =>
                `/v1/announcement?page=${page}&size=${size}`,
            providesTags: ['Announcement']
        }),
        storeAnnouncement: builder.mutation<IAnnouncement, FormData>({
            query: body => ({
                url: '/v1/announcement',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Announcement']
        })
    }),
    overrideExisting: 'throw'
});

export const { useGetAnnouncementsQuery, useStoreAnnouncementMutation } =
    announcementApiSlice;
