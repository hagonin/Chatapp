import * as Yup from 'yup';
import email from './email';
import password from './password';
import phone_number from './phone_number';
import confirm_password from './confirm_password';
import otp from './otp';

const AuthFormSchema = Yup.object().shape({
    email,
    password
});


const ConfirmPasswordSchema = Yup.object().shape({
    password,
    confirm_password
});

const EmailSchema = Yup.object().shape({
    email,
});

const SignInWithPhoneSchema = Yup.object().shape({
    phone_number,
    password
});

const SignUpWithPhoneSchema = Yup.object().shape({
    phone_number,
    otp
});

export { ConfirmPasswordSchema, EmailSchema, SignInWithPhoneSchema, SignUpWithPhoneSchema, AuthFormSchema };