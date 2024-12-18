interface IAddEditAnnouncementRequest {
    title: string;
    categoryId: string;
    description: string;
    price: string; // Optional @TODO What type
    phoneNumber: string; // Optional
    image?: string; // Optional
}

interface IAddEditAnnouncementResponse {
    id: string;
    title: string;
    categoryName: string;
    description: string;
    price: string | null;
    phoneNumber: string | null;
    imagePath: string | null;
    userData: {
        firstName: string;
        lastName: string;
    };
}

export type { IAddEditAnnouncementRequest, IAddEditAnnouncementResponse };
