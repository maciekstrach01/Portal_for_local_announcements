import { object, string, ref } from 'yup';

const RegisterSchema = object({
    firstName: string()
        .required('This field is required.')
        .min(2, 'This field must have at least 2 letters.')
        .max(50, 'This field must have max 50 letters.'),
    lastName: string()
        .required('This field is required.')
        .min(2, 'This field must have at least 2 letters.')
        .max(50, 'This field must have max 50 letters.'),
    email: string()
        .required('This field is required.')
        .email('Wrong email format.'),
    password: string()
        .required('This field is required.')
        .min(8, 'This field must have at least 8 letters.'),
    confirmPassword: string()
        .required('This field is required.')
        .oneOf([ref('password')], 'Passwords must match.')
});

export default RegisterSchema;
