import type { FormContext, FormOptions, GenericObject } from "vee-validate";

export interface FormRef<T extends Record<string, unknown>> {
  form: FormContext<T>;
}

export type FormParameters<T extends GenericObject> = FormOptions<T>;

export type FormProps<T extends GenericObject> = {
  validationSchema: FormParameters<T>["validationSchema"];
  initialValues?: FormParameters<T>["initialValues"];
  initialErrors?: FormParameters<T>["initialErrors"];
  initialTouched?: FormParameters<T>["initialTouched"];
  validateOnMount?: FormParameters<T>["validateOnMount"];
  keepValues?: FormParameters<T>["keepValuesOnUnmount"];
};

export type FormEmits<T extends GenericObject> = {
  submit: [T];
  "invalid-submit": [];
};
