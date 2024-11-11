import React from 'react';

import { useDemoQuery } from '@/redux/demo/demoApiSlice';

import type { IErrorResponse } from '@/types/api/common';

const Demo = () => {
    const { data, error, isLoading, isSuccess } = useDemoQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const showTemplate = (
        innerTemplate: React.JSX.Element
    ): React.JSX.Element => (
        <>
            <h1>Demo</h1>

            <div>{innerTemplate}</div>
        </>
    );

    if (error) {
        let errorMessage = 'Error!';

        if ('status' in error) {
            const apiErrorResponse = error.data as IErrorResponse;

            if (apiErrorResponse?.error) {
                errorMessage = `Error: ${apiErrorResponse.error}`;
            }
        }

        return showTemplate(<p>{errorMessage}</p>);
    }

    if (isLoading) {
        return showTemplate(<p>Loading...</p>);
    }

    if (isSuccess) {
        return showTemplate(<p>{data.msg}</p>);
    }
};

export default Demo;
