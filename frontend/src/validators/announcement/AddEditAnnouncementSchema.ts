import { mixed, number, object, string } from 'yup';

const AddEditAnnouncementSchema = object({
    title: string()
        .required('This field is required')
        .max(100, 'This field must have max 100 characters'),
    categoryId: string().required('This field is required'),
    description: string()
        .required('This field is required')
        .min(20, 'This field must have at least 20 characters')
        .max(1000, 'This field must have max 1000 characters'),
    // @TODO Entered 2.99999 - nothing!
    price: number()
        .positive('This field must be a positive number')
        .min(0.01, 'This field must have value greater than or equal 0.01')
        .max(
            9999999999.99,
            'This field must have value less than or equal 9999999999.99'
        ),
    // @TODO Optional, regex
    phoneNumber: string(),
    image: mixed()
        .test(
            'fileFormat',
            'Only these file types are allowed: JPEG, PNG and GIF',
            value => {
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
            }
        )
        .test('fileSize', 'File size must be less than 5MB', value => {
            const file = value as File;

            if (file) {
                return file.size <= 5 * 1024 * 1024;
            }

            return true;
        })
});

export default AddEditAnnouncementSchema;
