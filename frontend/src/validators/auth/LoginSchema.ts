import { object, string } from 'yup';

const LoginSchema = object({
    email: string()
        .required('This field is required')
        .email('Wrong email format')
        .max(64, 'This field must have max 64 characters'),
    password: string()
        .required('This field is required')
        .min(8, 'This field must have at least 8 characters')
        .max(48, 'This field must have max 48 characters')
});

export default LoginSchema;
