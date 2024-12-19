import { mixed, number, object, string } from 'yup';

const AddEditAnnouncementSchema = object({
    title: string()
        .required('This field is required')
        .max(100, 'This field must have max 100 characters'),
    categoryId: string()
        .required('This field is required')
        .uuid('This field must have category ID'),
    description: string()
        .required('This field is required')
        .min(20, 'This field must have at least 20 characters')
        .max(1000, 'This field must have max 1000 characters'),
    price: number()
        .positive('This field must be a positive number')
        .min(0.01, 'Minimal value accepted: 0.01')
        .max(9999999999.99, 'Maximal value accepted: 9999999999.99'),
    phoneNumber: string().matches(
        /^(\+?[0-9\s\-()]{9,20})$/,
        'Invalid phone number format'
    ),
    image: mixed()
        .test('fileFormat', 'Accepted file types: JPEG, PNG, GIF', value => {
            const file = value as File;

            if (file) {
                const supportedFormats = [
                    'image/jpeg',
                    'image/png',
                    'image/gif'
                ];

                return supportedFormats.includes(file.type);
            }

            return true;
        })
        .test('fileSize', 'File size must be less than 5MB', value => {
            const file = value as File;

            if (file) {
                return file.size <= 5 * 1024 * 1024;
            }

            return true;
        })
});

export default AddEditAnnouncementSchema;
