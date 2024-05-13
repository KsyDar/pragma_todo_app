import type { Task } from "~/types/task";

/**
 * Тип эмитов сортировки задач
 */
export type TaskSortingEmits = {
  /** Сортировать */
  sort: [(a: Task, b: Task) => number];
};
