import { store } from '@/redux';
import { defer } from 'react-router-dom';

import { announcementApiSlice } from '@/redux/announcement/announcementApiSlice';

import type { LoaderFunctionArgs } from 'react-router';

export const getAnnouncementByIdLoader = async ({
    params
}: LoaderFunctionArgs) => {
    const id = params.id as string;

    const responsePromise = store
        .dispatch(
            announcementApiSlice.endpoints.getAnnouncementById.initiate(id)
        )
        .unwrap();

    return defer({
        announcement: responsePromise
    });
};
