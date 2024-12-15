import { ref, object, string } from 'yup';

const ChangePasswordSchema = object({
    currentPassword: string()
        .required('This field is required')
        .min(8, 'This field must have at least 8 characters')
        .max(48, 'This field must have max 48 characters'),
    newPassword: string()
        .required('This field is required')
        .min(8, 'This field must have at least 8 characters')
        .max(48, 'This field must have max 48 characters'),
    confirmNewPassword: string()
        .required('This field is required')
        .oneOf([ref('newPassword')], 'Passwords must match')
});

export default ChangePasswordSchema;
