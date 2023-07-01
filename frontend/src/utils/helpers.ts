import { FormikConfig, FormikErrors, FormikProps, FormikTouched } from "formik";

export const formatPhone = (phone: string) => {
  return phone.replace(/-|(|)/g, '').split(' ').join('');
};
