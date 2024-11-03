import { useLoaderData } from 'react-router';

const Demo = () => {
    const loaderData = useLoaderData();

    console.log(loaderData);

    return (
        <>
            <h1>Demo</h1>
        </>
    );
};

export default Demo;
