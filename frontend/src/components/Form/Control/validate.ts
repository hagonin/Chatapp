import { Rules } from "@hooks/type";

export const emailValidate: Rules[] = [
    { rule: 'required', message: 'Please enter your email' },
    {
        rule: 'email',
        message: 'Please provide a valid email',
    },
];

export const passwordValidate: Rules[] = [{ rule: 'required', message: 'Please enter your password' }]


export const phoneValidate: Rules[] = [
    { rule: 'required', message: 'Please enter your phone' },
    { rule: 'min', min: 15, message: 'Please provide least at 10 digits' },
]

export const usernameValidate: Rules[] = [
    { rule: 'required', message: 'Please enter your name' },
    { rule: 'name', message: 'Please provide a valid name' },
]
