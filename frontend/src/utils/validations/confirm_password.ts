
import * as Yup from 'yup';

const confirm__password = Yup.string()
    .max(30, 'Please provide up to 30 characters')
    .min(8, 'Least at 8 characters')
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match')

export default confirm__password;