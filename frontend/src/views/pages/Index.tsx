import { useState, useEffect } from 'react';

import AnnouncementItem from '@/components/organisms/announcement/item';
import { useGetAnnouncementsQuery } from '@/redux/announcement/announcementApiSlice';

import type { IAnnouncement } from '@/types/api/announcement';

const Index = () => {
    const [page, setPage] = useState(0);
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

    const { data, error, isFetching, isLoading } = useGetAnnouncementsQuery({
        page,
        size: 10
    });

    useEffect(() => {
        if (data) {
            setAnnouncements(oldAnnouncements => [
                ...oldAnnouncements,
                ...data.content
            ]);
        }
    }, [data]);

    useEffect(() => {
        return () => setAnnouncements([]);
    }, []);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const announcementsList = announcements.map(announcement => (
        <AnnouncementItem key={announcement.id} announcement={announcement} />
    ));

    if (error) {
        return (
            <div className="flex flex-col md:mx-auto md:max-w-170">
                <h1>Error while loading announcements!</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col md:mx-auto md:max-w-170">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:mx-auto md:max-w-170">
            <div className="flex flex-col gap-2 md:gap-4">
                {announcements.length ? (
                    announcementsList
                ) : (
                    <h1>No announcements found</h1>
                )}
            </div>

            <div className="flex justify-center">
                {isFetching && <p>Loading...</p>}

                {!isLoading && !isFetching && !error && (
                    <div>
                        {data?.totalPages && page < data.totalPages - 1 && (
                            <button
                                className="px-4 py-2 bg-primary-500 rounded-lg text-white font-medium hover:bg-primary-600 md:px-8 md:py-4"
                                onClick={loadMore}
                            >
                                Load more
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
