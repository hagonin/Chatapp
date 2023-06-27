
import * as Yup from 'yup';

const phone_number = Yup.string()
    .required('Please enter your phone')
    .min(15, 'Least at 11 characters');

export default phone_number;