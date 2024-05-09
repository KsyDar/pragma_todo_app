import type {TaskStatus} from "~/types/taskStatus";

export type Task = {
  id: string
  name: string
  description: string
  status: TaskStatus
  email: string
}
