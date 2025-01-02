import { useGetAnnouncementsQuery } from '@/redux/announcement/announcementApiSlice';

import AnnouncementItem from '@/components/organisms/announcement/item';

import type { IAnnouncementIndexResponse } from '@/types/api/announcement';

const Index = () => {
    const { data, error, isLoading } = useGetAnnouncementsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error!</h1>;
    }

    const response = data as IAnnouncementIndexResponse;
    const { content: announcements } = response;

    const announcementsList = announcements.map(announcement => (
        <AnnouncementItem key={announcement.id} announcement={announcement} />
    ));

    return (
        <div className="flex flex-col gap-2 md:gap-4 md:max-w-170 md:mx-auto">
            {announcements.length ? (
                announcementsList
            ) : (
                <h1>No announcements found</h1>
            )}
        </div>
    );
};

export default Index;
