import type { TypedSchema } from "vee-validate";

export type GetGenericType<T> = T extends TypedSchema<infer X> ? X : never;
