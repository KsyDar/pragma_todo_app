import type { UserRole } from "./userRole";

/**
 * Тип пользователя на сервере
 */
export interface ServerUser {
  /** Логин */
  login: string;
  /** Пароль */
  password: string;
  /** Роль */
  role: UserRole;
}
