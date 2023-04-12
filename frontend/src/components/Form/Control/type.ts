import React from 'react'
import { UseFormProps } from '@hooks/type';

export interface InputProps {
    name: string;
    values: UseFormProps["initValues"]
    placeholder?: string;
    label?: string;
    errorMessage?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckBoxProps {
    name: string;
    values: {
        [key: string]: boolean
    };
    placeholder?: string;
    label?: string;
    errorMessage?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    option: {
        id?: number;
        label: string;
    }
}