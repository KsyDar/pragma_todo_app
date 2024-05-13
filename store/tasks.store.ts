import type { Task } from "~/types/task";

/** Тип функции сортировки */
type SortFuncType = (a: Task, b: Task) => number;

export const useTaskStore = defineStore("tasks", () => {
  /** Список задач */
  const tasks = ref<Task[]>([]);
  /** Последний вызванный метод сортировки */
  let lastSortMethod: SortFuncType | null = null;

  /**
   * Получение списка задач
   */
  const fetchTasks = async () => {
    const { data } = await useFetch<Task[]>("/api/tasks", {
      method: "GET",
    });
    if (data.value !== null) {
      tasks.value = data.value;
    }
  };

  /**
   * Пагинация
   * @param page - страница
   * @param pageSize - кол-во элементов на странице
   */
  function localPaginatedFetch(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return tasks.value.slice(start, end);
  }

  /**
   * Сортировка
   * @param method - метод сортировки
   */
  function sortTasks(method: SortFuncType) {
    lastSortMethod = method;
    tasks.value = tasks.value.sort(lastSortMethod);
  }

  /**
   * Сортировка при наличии последнего выбранного метода
   */
  function sortIfNeeded() {
    if (lastSortMethod) {
      tasks.value = tasks.value.sort(lastSortMethod);
    }
  }

  /**
   * Добавление задачи
   * @param task - задача
   */
  function addNewTask(task: Task) {
    $fetch("/api/tasks", {
      method: "POST",
      body: {
        task: task,
      },
    }).catch((_) => {
      tasks.value = tasks.value.filter((x) => x.id !== task.id);
      sortIfNeeded();
    });

    tasks.value.push(task);
    sortIfNeeded();
  }

  /**
   * Изменение задачи
   * @param task - задача
   */
  function editTask(task: Task) {
    $fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      body: {
        task: task,
      },
    }).catch((_) => {
      const taskIndex = tasks.value.findIndex((x) => x.id === task.id);
      tasks.value.splice(taskIndex, 1, task);
      sortIfNeeded();
    });

    const taskIndex = tasks.value.findIndex((x) => x.id === task.id);
    tasks.value.splice(taskIndex, 1, task);
    sortIfNeeded();
  }

  return {
    tasks,
    fetchToDos: fetchTasks,
    sortTasks,
    localPaginatedFetch,
    addNewTask,
    editTask,
  };
});
