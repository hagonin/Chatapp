import React from 'react'

export interface InputProps {
    name: string;
    values: {
        [key: string]: string
    }
    placeholder?: string;
    label?: string;
    errorMessage?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    typeClass?: 'search',
    disabled?: boolean
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