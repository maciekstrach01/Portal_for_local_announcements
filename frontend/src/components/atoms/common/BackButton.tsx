import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

type BackButtonProps = {
    to?: string;
};

const BackButton = ({ to = '/' }: BackButtonProps) => {
    return (
        <div className="flex">
            <Link
                to={to}
                className="flex gap-1 items-center grow-0 text-primary-500 hover:text-primary-600 hover:underline"
            >
                <ArrowLeftIcon className="size-4" />
                <span>Back</span>
            </Link>
        </div>
    );
};

export default BackButton;
