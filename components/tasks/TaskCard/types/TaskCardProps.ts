import type { Task } from "~/types/task";
import type { TaskCardModes } from "~/components/tasks/TaskCard/types/TaskCardModes";

type ModeTaskProps<T extends Task | null, M extends TaskCardModes> = {
  task: T;
  mode: M;
};

export type TaskCardProps =
  | ModeTaskProps<Task, TaskCardModes.ReadOnly>
  | ModeTaskProps<Task, TaskCardModes.Edit>
  | ModeTaskProps<null, TaskCardModes.Add>;

export type TaskCardEmits = {
  save: [Task];
  "change-mode": [TaskCardModes];
};
