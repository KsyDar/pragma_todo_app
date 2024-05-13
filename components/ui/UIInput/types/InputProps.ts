/**
 * Тип пропсов инпута
 */
export type InputProps = {
  /** Плейсхолдер */
  placeholder: HTMLInputElement["placeholder"];
  /** Имя поля для валидации */
  name: string;
  /** Лэйбл */
  label: string;
  /** Тип */
  type?: HTMLInputElement["type"];
  /** Компонент */
  component?: "input" | "textarea";
};
