interface IChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

type IChangePasswordRequestFields =
    | 'currentPassword'
    | 'newPassword'
    | 'confirmNewPassword';

export type { IChangePasswordRequest, IChangePasswordRequestFields };
