import type { TypedSchema } from "vee-validate";
/** Получение типа дженерика */
export type GetGenericType<T> = T extends TypedSchema<infer X> ? X : never;
