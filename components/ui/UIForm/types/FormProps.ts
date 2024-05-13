import type { FormContext, FormOptions, GenericObject } from "vee-validate";

/**
 * Интерфейс для типизации компонента формы
 */
export interface FormRef<T extends Record<string, unknown>> {
  /** Форма-ref */
  form: FormContext<T>;
}
/**
 * Тип параметров формы
 */
export type FormParameters<T extends GenericObject> = FormOptions<T>;
/**
 * Тип пропсов формы
 */
export type FormProps<T extends GenericObject> = {
  /** Схема валидации */
  validationSchema: FormParameters<T>["validationSchema"];
  /** Начальные значения */
  initialValues?: FormParameters<T>["initialValues"];
};
/**
 * Тип эмитов формы
 */
export type FormEmits<T extends GenericObject> = {
  /** Отправить */
  submit: [T];
  /** Некорректный ввод */
  "invalid-submit": [];
};
