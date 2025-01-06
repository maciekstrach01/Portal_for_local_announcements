type IIndexQuery = {
    page?: number;
    size?: number;
};

type IErrorResponse = {
    timestamp: string;
    status: number;
    error: string;
    path: string;
};

export type { IIndexQuery, IErrorResponse };
