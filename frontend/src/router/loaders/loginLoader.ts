import { LoaderFunctionArgs } from 'react-router-dom';

export const loginLoader = ({ request }: LoaderFunctionArgs) => {
    return new URL(request.url).searchParams.get('message');
};
