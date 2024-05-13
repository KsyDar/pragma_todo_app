import type { TaskStatus } from "~/types/taskStatus";

/**
 * Тип задачи
 */
export type Task = {
  /** ИД */
  id: string;
  /** Название */
  name: string;
  /** Описание */
  description: string;
  /** Статус выполнения */
  status: TaskStatus;
  /** Email */
  email: string;
};
