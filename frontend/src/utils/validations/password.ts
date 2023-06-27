
import * as Yup from 'yup';

const password = Yup.string()
    .max(30, 'Please provide up to 30 characters')
    .min(8, 'Least at 8 characters')
    .required('Please provide your password');

export default password;