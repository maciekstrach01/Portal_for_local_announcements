import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import ItemHeader from './Header';
import getFullImagePath from '@/helpers/getFullImagePath';
import getFullTimeDifference from '@/helpers/getFullTimeDifference';

import type { IAnnouncement } from '@/types/api/announcement';

import noPreviewAvailableImg from '@/assets/images/no-preview-available.png';

type Props = {
    announcement: IAnnouncement;
};

const Item = ({ announcement }: Props) => {
    const {
        id,
        price,
        title,
        imagePath,
        description,
        categoryName,
        creationTimestamp,
        creatorDetails: { firstName, lastName }
    } = announcement;
    const fullName = `${firstName} ${lastName}`;
    const fullTimeDifference = getFullTimeDifference(creationTimestamp);
    const fullImagePath = imagePath ? getFullImagePath(imagePath) : null;

    return (
        <Link
            to={`/announcements/${id}`}
            className="flex flex-col gap-2 p-2 rounded-xl shadow-md hover:shadow-xl md:p-4"
        >
            <ItemHeader
                categoryName={categoryName}
                timeInfo={fullTimeDifference}
                className="md:hidden"
            />

            <div className="flex items-center gap-6">
                <img
                    src={fullImagePath || noPreviewAvailableImg}
                    alt={title}
                    className="block size-20 object-cover rounded-md md:size-50 md:rounded-xl"
                />

                <div className="flex-grow">
                    <ItemHeader
                        categoryName={categoryName}
                        timeInfo={fullTimeDifference}
                        className="hidden md:flex"
                    />

                    <div className="flex items-center gap-1 text-sm md:text-base">
                        <UserCircleIcon className="size-4" />
                        <span className="line-clamp-1">{fullName}</span>
                    </div>

                    <h2 className="text-lg font-medium line-clamp-1 md:text-2xl">
                        {title}
                    </h2>

                    {price && <div>{price.toFixed(2)}&nbsp;PLN</div>}

                    <div className="hidden whitespace-pre-wrap mt-2 md:block md:!line-clamp-5">
                        {description}
                    </div>
                </div>
            </div>

            <div className="whitespace-pre-wrap line-clamp-3 md:hidden">
                {description}
            </div>
        </Link>
    );
};

export default Item;
