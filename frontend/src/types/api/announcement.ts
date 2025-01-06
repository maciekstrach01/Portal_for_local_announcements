interface IAddEditAnnouncementRequest {
    title: string;
    categoryId: string;
    description: string;
    price: '' | number;
    phoneNumber: string;
    image: '' | File;
}

interface IAnnouncement {
    id: string;
    title: string;
    categoryName: string;
    description: string;
    price: number | null;
    phoneNumber: string | null;
    imagePath: string | null;
    creatorDetails: {
        firstName: string;
        lastName: string;
    };
    creationTimestamp: string;
    updateTimestamp: string;
}

interface IAnnouncementIndexResponse {
    content: IAnnouncement[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}

interface IAnnouncementShowResponse {
    announcement: IAnnouncement;
}

export type {
    IAnnouncement,
    IAnnouncementShowResponse,
    IAnnouncementIndexResponse,
    IAddEditAnnouncementRequest
};
