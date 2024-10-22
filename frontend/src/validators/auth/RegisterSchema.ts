import { object, string } from 'yup';

const RegisterSchema = object({
    firstName: string()
        .required('This field is required.')
        .min(2, 'This field must have at least 2 letters.')
        .max(64, 'This field must have max 64 letters.'),
    lastName: string()
        .required('This field is required.')
        .min(2, 'This field must have at least 2 letters.')
        .max(64, 'This field must have max 64 letters.'),
    email: string()
        .required('This field is required.')
        .email('Wrong email format.'),
    // @TODO Must contain letters, numbers and special values
    password: string()
        .required('This field is required.')
        .min(8, 'This field must have at least 8 letters.')
        .max(64, 'This field must have max 64 letters.'),
    // @TODO Must contain letters, numbers and special values
    // @TODO Must be the same as 'password'
    confirmPassword: string()
        .required('This field is required.')
        .min(8, 'This field must have at least 8 letters.')
        .max(64, 'This field must have max 64 letters.')
});

export default RegisterSchema;
