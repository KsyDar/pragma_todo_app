export type InputProps = {
  placeholder: HTMLInputElement["placeholder"];
  name: string;
  label: string;
  type?: HTMLInputElement["type"];
  component?: "input" | "textarea";
};
