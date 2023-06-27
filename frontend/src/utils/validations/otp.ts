
import * as Yup from 'yup';

const otp = Yup.string()
    .required('Please provide your otp')
    .max(6, 'Up to 6 characters');

export default otp;