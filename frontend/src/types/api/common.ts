type IResponse = {
    data: unknown;
};

type IErrorResponse = {
    timestamp: string;
    status: number;
    error: string;
    path: string;
};

export type { IResponse, IErrorResponse };
