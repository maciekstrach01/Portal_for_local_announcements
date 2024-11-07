// import { defer, redirect } from 'react-router-dom';

import { store } from '@/redux';
import { toast } from 'react-toastify';
import { demoApiSlice } from '@/redux/demo/demoApiSlice';

export const demoLoader = async (): Promise<null> => {
    console.log('demoLoader');

    try {
        const response = await store.dispatch(
            demoApiSlice.endpoints.demo.initiate(undefined, {
                forceRefetch: true
            })
        );

        console.log(response);

        if ('error' in response) {
            // @TODO
            toast.error('Error response!');

            return null;
        }

        return null;
    } catch {
        // @TODO
        return null;
    }
};
