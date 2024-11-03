import { defer } from 'react-router-dom';

import { store } from '@/store';
import { demo } from '@/store/demo/demoActions.ts';

// @TODO Proper type!
export const demoLoader = async (): Promise<any> => {
    console.log('demoLoader');

    const response = await store.dispatch(demo());

    console.log(response);

    return defer({ message: response.payload });
};
