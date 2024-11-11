import { string, ref } from 'yup';

import LoginSchema from '@/validators/auth/LoginSchema';

const RegisterSchema = LoginSchema.shape({
    firstName: string()
        .required('This field is required')
        .min(2, 'This field must have at least 2 characters')
        .max(50, 'This field must have max 50 characters'),
    lastName: string()
        .required('This field is required')
        .min(2, 'This field must have at least 2 characters')
        .max(50, 'This field must have max 50 characters'),
    confirmPassword: string()
        .required('This field is required')
        .oneOf([ref('password')], 'Passwords must match')
});

export default RegisterSchema;
