/**
 * Тип пропсов кнопки
 */
export type ButtonProps = {
  /** Тип кнопки */
  type?: HTMLButtonElement["type"];
  /** Является ли кнопка недоступной для взаимодействия */
  disabled?: HTMLButtonElement["disabled"];
  /** прозрачная кнопка */
  transparent?: boolean;
};
