import type { UserRole } from "~/types/userRole";

/**
 * Тип пользователя на клиенте
 */
export interface User {
  /** Логин */
  username: string;
  /** Роль */
  role: UserRole;
}
