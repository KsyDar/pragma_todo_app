import type { UserRole } from "~/types/userRole";

export interface User {
  username: string;
  role: UserRole;
}
