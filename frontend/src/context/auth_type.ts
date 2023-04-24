import { FormDataType } from "@hooks/type";

export interface UserStateType {
    id: number | null;
    username: string;
    last_name?: string;
    first_name?: string;
    avatar?: string;
    email: string;
    bio: string;
    phone: string;
    isVerify: boolean
}

export interface AuthContextType {
    user: UserStateType;
    setUser: (user: UserStateType) => void;
    handleEmailSignUp: ({ form, data }: FormDataType) => Promise<void> | void;
    requestOTP: (opt: string) => void,
    verifyOTP: (otp: string) => void
}
