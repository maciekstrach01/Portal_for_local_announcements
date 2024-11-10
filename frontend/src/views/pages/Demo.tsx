import React from 'react';

import { IErrorResponse } from '@/types/api/common';
import { useDemoQuery } from '@/redux/demo/demoApiSlice';

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
        if ('status' in error) {
            const apiErrorResponse = error.data as IErrorResponse;

            return showTemplate(<p>{`Error: ${apiErrorResponse.error}`}</p>);
        }

        return showTemplate(<p>Unknown error!</p>);
    }

    if (isLoading) {
        return showTemplate(<p>Loading...</p>);
    }

    if (isSuccess) {
        return showTemplate(<p>{data.msg}</p>);
    }
};

export default Demo;
