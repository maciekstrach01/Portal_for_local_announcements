interface IAddEditAnnouncementRequest {
    title: string;
    categoryId: string;
    description: string;
    price: '' | number;
    phoneNumber: string;
    image: '' | File;
}

interface IAddEditAnnouncementResponse {
    id: string;
    title: string;
    categoryName: string;
    description: string;
    price: number | null;
    phoneNumber: string | null;
    imagePath: string | null;
    userData: {
        firstName: string;
        lastName: string;
    };
}

export type { IAddEditAnnouncementRequest, IAddEditAnnouncementResponse };
