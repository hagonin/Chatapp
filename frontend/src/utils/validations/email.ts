
import * as Yup from 'yup';

const email = Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email')
    .max(30, 'Please provide up to 30 characters')
    .required('Please enter your email');

export default email;