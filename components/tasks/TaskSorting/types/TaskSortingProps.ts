import type { Task } from "~/types/task";

export type TaskSortingEmits = {
  sort: [(a: Task, b: Task) => number];
};
