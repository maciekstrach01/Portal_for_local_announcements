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
}

interface IAnnouncementIndexResponse {
    content: IAnnouncement[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}

export type {
    IAnnouncement,
    IAnnouncementIndexResponse,
    IAddEditAnnouncementRequest
};
