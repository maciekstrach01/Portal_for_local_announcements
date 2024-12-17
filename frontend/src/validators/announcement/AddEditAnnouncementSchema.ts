import { object, string } from 'yup';

const AddEditAnnouncementSchema = object({
    title: string()
        .required('This field is required')
        .max(100, 'This field must have max 100 characters'),
    // @TODO Category
    description: string()
        .required('This field is required')
        .min(20, 'This field must have at least 20 characters')
        .max(1000, 'This field must have max 1000 characters'),
    // @TODO Optional
    price: string().required('This field is required'),
    // @TODO Optional
    phoneNumber: string().required('This field is required')
});

export default AddEditAnnouncementSchema;
