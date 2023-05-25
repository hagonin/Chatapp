export type Rule = 'required' | 'min' | 'match' | 'pattern' | 'email' | 'phone_number' | 'password' | 'username' | 'reset_email' | 'reset_password' | 'reset_confirmPassword' |
    'displayName' | 'otp';

export interface TestProp {
    value: string;
    message?: Rules["message"];
    min?: Rules["min"];
    match?: Rules["nameFieldMatch"]
}
export const Tests = {
    required: ({ value, message }: TestProp) => value.trim().length > 0 ? '' : message,
    email: ({ value, message }: TestProp) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(value) ? '' : message;
    },
    min: ({ value, min = 0, message }: TestProp) => value.trim().length < min ? message : '',
    phone: ({ value, message }: TestProp) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value) ? '' : message
    },
    password: ({ value, message }: TestProp) => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return passRegex.test(value) ? '' : message;
    },
    name: ({ value, message }: TestProp) => {
        const nameRegex = /^(?!-)[a-zA-Z-]*[a-zA-Z]$/;
        return nameRegex.test(value.trim()) ? '' : message
    },
    match: ({ value, message, match }: TestProp) => {
        const matchValue = match as string;

        return value === matchValue ? '' : message;
    },
}

export type Error = Partial<{
    [key in Rule]: string;
}>
export interface Rules {
    rule: Rule;
    message: string | JSX.Element;
    min?: number;
    nameFieldMatch?: string | number
}

export interface FormDataType {
    form: FormData;
    data: {
        [key: string]: string
    }
}

export interface UseFormProps {
    initValues: {
        [key: string]: string
    };
    onCallApi: ({ form, data }: FormDataType) => (Promise<void>);
    validate?: {
        [rule: string]: Rules[]
    };
    resetAfterSubmit?: boolean
}