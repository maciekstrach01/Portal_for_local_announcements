import { Suspense } from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { Await, useLoaderData } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import getFullImagePath from '@/helpers/getFullImagePath';
import BackButton from '@/components/atoms/common/BackButton';
import AsyncError from '@/components/organisms/router/AsyncError';
import getFullTimeDifference from '@/helpers/getFullTimeDifference';
import ItemHeader from '@/components/organisms/announcement/item/Header';

import type {
    IAnnouncement,
    IAnnouncementShowResponse
} from '@/types/api/announcement';

import noPreviewAvailableImg from '@/assets/images/no-preview-available.png';

const Single = () => {
    const loaderData = useLoaderData() as IAnnouncementShowResponse;

    const renderAnnouncementData = (announcement: IAnnouncement) => {
        const {
            price,
            title,
            imagePath,
            description,
            phoneNumber,
            categoryName,
            creationTimestamp,
            creatorDetails: { firstName, lastName }
        } = announcement;
        const fullName = `${firstName} ${lastName}`;
        const fullTimeDifference = getFullTimeDifference(creationTimestamp);
        const fullImagePath = imagePath ? getFullImagePath(imagePath) : null;

        return (
            <div className="flex flex-col gap-4">
                <h1 className="text-lg text-center font-medium md:text-2xl">
                    {title}
                </h1>

                <ItemHeader
                    categoryName={categoryName}
                    timeInfo={fullTimeDifference}
                />

                <div className="flex flex-col gap-4 justify-center md:flex-row">
                    <img
                        src={fullImagePath || noPreviewAvailableImg}
                        alt={title}
                        className="block w-full object-cover rounded-md md:w-1/2 md:rounded-xl"
                    />

                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-1 text-sm md:text-base">
                            <UserCircleIcon className="size-4" />
                            <span>{fullName}</span>
                        </div>

                        {price && <div>{price.toFixed(2)}&nbsp;PLN</div>}

                        {phoneNumber && (
                            <a
                                href={`tel:${phoneNumber}`}
                                className="flex items-center grow-0"
                            >
                                <PhoneIcon className="size-4" />
                                &nbsp;
                                <span>{phoneNumber}</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="whitespace-pre-wrap">{description}</div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <BackButton />

            <Suspense fallback={<h1>Loading...</h1>}>
                <Await
                    resolve={loaderData.announcement}
                    errorElement={<AsyncError />}
                >
                    {renderAnnouncementData}
                </Await>
            </Suspense>
        </div>
    );
};

export default Single;
