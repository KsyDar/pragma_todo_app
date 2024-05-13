import type {Task} from "~/types/task";
import type {TaskCardModes} from "~/components/tasks/TaskCard/types/TaskCardModes";

/**
 * Тип пропсов для карточки задачи
 */
type ModeTaskProps<T extends Task | null, M extends TaskCardModes> = {
  /** Задача */
  task: T;
  /** Состояние карточки */
  mode: M;
};

export type TaskCardProps =
  | ModeTaskProps<Task, TaskCardModes.ReadOnly>
  | ModeTaskProps<Task, TaskCardModes.Edit>
  | ModeTaskProps<null, TaskCardModes.Add>;

/**
 * Тип эмитов карточки задачи
 */
export type TaskCardEmits = {
  /** Сохранение задачи */
  save: [Task];
  /** Смена состояния карточки */
  "change-mode": [TaskCardModes];
};
