import type {UserRole} from "./userRole";

export interface ServerUser {
  login: string;
  password: string;
  role: UserRole
}
