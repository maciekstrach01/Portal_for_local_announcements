interface IAddEditAnnouncementRequest {
    title: string;
    categoryId?: string;
    description: string;
    price: string; // Optional @TODO What type
    phoneNumber: string; // Optional
    image?: string; // Optional
}

export type { IAddEditAnnouncementRequest };
