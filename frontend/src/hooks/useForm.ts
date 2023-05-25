import React, { FormEvent, useCallback, useState } from 'react';
import { Error, UseFormProps, TestProp, Tests } from './type';

const useForm = ({ initValues, onCallApi, validate = {}, resetAfterSubmit = true }: UseFormProps) => {
    const [values, setValues] = React.useState(initValues);
    const [errors, setErrors] = React.useState<Error>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        validator(e.target.name, e.target.value);
    }, [])

    const onBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        validator(e.target.name, e.target.value);
    }, [])

    const validator = useCallback((name: string, value: string) => {
        let errorMessage: TestProp["message"];
        let isValid = true;
        for (let index in validate[name]) {
            const rule = validate[name][index].rule;
            const message = validate[name][index].message;
            switch (rule) {
                case 'required':
                    errorMessage = Tests.required({ value, message });
                    break;
                case 'email':
                    errorMessage = Tests.email({ value, message });
                    break;
                case 'min':
                    const min = validate[name][index].min;
                    errorMessage = Tests.min({ value, min, message });
                    break;
                case 'phone_number':
                    errorMessage = Tests.phone({ value, message });
                    break;
                case 'password':
                    errorMessage = Tests.password({ value, message });
                    break;
                case 'username':
                    errorMessage = Tests.name({ value, message });
                    break;
                case 'match':
                    const matchName = validate[name][index].nameFieldMatch as string;
                    const match = values[matchName];
                    errorMessage = Tests.match({ value, message, match });
                    break;

            }

            if (errorMessage) {
                isValid = false;
                break;
            }
        }
        setErrors(preError => ({ ...preError, [name]: errorMessage }));
        setValues(preValues => ({ ...preValues, [name]: value }));
        return isValid;
    }, [setErrors, setValues])

    const onSubmit = useCallback((event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const formData = new FormData(event?.target as HTMLFormElement);
        const formProps = { ...Object.fromEntries(formData) };
        let validForm = true;
        for (let name in formProps) {
            const value = formProps[name] as string;
            const inValid = validator(name, value);
            if (!inValid) {
                validForm = false;
            }

        }

        if (validForm) {
            setIsSubmitting(true);
            const formData = getFormData();
            onCallApi({ form: formData, data: values })?.then(() => {
                resetAfterSubmit && reset();
            }).finally(() => {
                setIsSubmitting(false);
            })

        }
    }, [setIsSubmitting, onCallApi, resetAfterSubmit])

    const getFormData = useCallback(() => {
        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]))
        return formData;
    }, [values]);

    const reset = useCallback(() => {
        setValues(initValues);
        setErrors({});
    }, [])

    return {
        onChange,
        onBlur,
        values,
        onSubmit,
        reset,
        errors,
        isSubmitting
    }
}
export default useForm;