import { apiSlice } from '@/redux/apiSlice';

import type {
    IAnnouncement,
    IAnnouncementIndexResponse
} from '@/types/api/announcement';

export const announcementApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // @TODO Params
        getAnnouncements: builder.query<IAnnouncementIndexResponse, void>({
            query: () => '/v1/announcement'
        }),
        storeAnnouncement: builder.mutation<IAnnouncement, FormData>({
            query: body => ({
                url: '/v1/announcement',
                method: 'POST',
                body
            })
        })
    }),
    overrideExisting: 'throw'
});

export const { useGetAnnouncementsQuery, useStoreAnnouncementMutation } =
    announcementApiSlice;
