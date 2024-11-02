import { object, string } from 'yup';

const LoginSchema = object({
    email: string()
        .required('This field is required')
        .email('Wrong email format'),
    password: string()
        .required('This field is required')
        .min(8, 'This field must have at least 8 characters')
});

export default LoginSchema;
