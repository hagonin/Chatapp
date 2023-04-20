import React, { FormEvent, useState } from 'react';
import { Error, UseFormProps, TestProp, Tests } from './type';

const useForm = ({ initValues, onCallApi, validate = {}, resetAfterSubmit = true }: UseFormProps) => {
    const [values, setValues] = React.useState(initValues);
    const [errors, setErrors] = React.useState<Error>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validator(e.target.name, e.target.value);
    }

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        validator(e.target.name, e.target.value);
    }

    const validator = (name: string, value: string) => {
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
                    console.log('errr', errorMessage)
                    break;
                case 'min':
                    const min = validate[name][index].min;
                    errorMessage = Tests.min({ value, min, message });
                    break;
                case 'phone':
                    errorMessage = Tests.phone({ value, message });
                    break;
                case 'password':
                    errorMessage = Tests.password({ value, message });
                    break;
                case 'name':
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
    }

    const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
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
            onCallApi(values).then(() => {
                resetAfterSubmit && reset();
            }).finally(() => {
                setIsSubmitting(false);
            })

        }
    }


    const reset = () => {
        setValues(initValues);
        setErrors({});
    }

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