/**
 * Тип пропсов селекта
 */
export type SelectProps = {
  /** Список значений */
  items: Array<string>;
  /** Плейсхолдер */
  placeholder?: string;
  /** v-model */
  modelValue?: string;
  /** Имя поля для валидации */
  name: string;
};
