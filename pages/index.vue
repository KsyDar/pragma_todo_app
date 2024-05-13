<template>
  <section>
    <h2 class="tasks__title">Create Task:</h2>
    <TaskCard :task="null" :mode="TaskCardModes.Add" @save="createNewTask" />
    <TaskSorting class="tasks__select" @sort="sort" />
    <TaskPagination
      :current-page="currentPage"
      :page-count="pageCount"
      :is-first-page="isFirstPage"
      :is-last-page="isLastPage"
      :total="taskStore.tasks.length"
      @prev="prev"
      @next="next"
    />

    <ul class="tasks__list">
      <li v-for="task of paginatedTasks" :key="task.id">
        <TaskCard
          :task="task"
          :mode="
            currentEditTaskId === task.id
              ? TaskCardModes.Edit
              : TaskCardModes.ReadOnly
          "
          @change-mode="changeMode($event, task.id)"
          @save="changeTask"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTaskStore } from "~/store/tasks.store";
import { useOffsetPagination } from "@vueuse/core";
import type { Task } from "~/types/task";
import TaskCard from "~/components/tasks/TaskCard/TaskCard.vue";
import TaskSorting from "~/components/tasks/TaskSorting/TaskSorting.vue";
import TaskPagination from "~/components/tasks/TaskPagination/TaskPagination.vue";
import { TaskCardModes } from "~/components/tasks/TaskCard/types/TaskCardModes";

const taskStore = useTaskStore();
await taskStore.fetchToDos();

/** Задачи на текущей странице */
const paginatedTasks = ref<Task[]>([]);
/** Текущая страница */
const page = ref(1);
/** Кол-во элементов на странице */
const pageSize = ref(3);

/**
 * Получение новой страницы задач
 * @param currentPage - страница
 * @param currentPageSize - кол-во элементов на странице
 */
const fetchLocalPaginatedData = ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number;
  currentPageSize: number;
}) => {
  paginatedTasks.value = taskStore.localPaginatedFetch(
    currentPage,
    currentPageSize,
  );
};

fetchLocalPaginatedData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
});

const { isFirstPage, isLastPage, currentPage, pageCount, prev, next } =
  useOffsetPagination({
    total: computed(() => taskStore.tasks.length),
    page: page,
    pageSize: pageSize,
    onPageChange: fetchLocalPaginatedData,
    onPageSizeChange: fetchLocalPaginatedData,
  });

/**
 * Сортировка задач
 * @param method - выбранный метод
 */
const sort = (method: (a: Task, b: Task) => number) => {
  taskStore.sortTasks(method);
  page.value = 1;
  fetchLocalPaginatedData({
    currentPage: page.value,
    currentPageSize: pageSize.value,
  });
};
/**
 * Создание новой задачи
 * @param task - задача
 */
const createNewTask = (task: Task) => {
  taskStore.addNewTask(task);

  fetchLocalPaginatedData({
    currentPage: page.value,
    currentPageSize: pageSize.value,
  });
};
/**
 * Изменение задачи
 * @param task - задача
 */
const changeTask = (task: Task) => {
  taskStore.editTask(task);
  currentEditTaskId.value = null;
  fetchLocalPaginatedData({
    currentPage: page.value,
    currentPageSize: pageSize.value,
  });
};
/** ИД редактируемой задачи */
const currentEditTaskId = ref<string | null>(null);
/**
 * Изменение состояния карточки задачи
 * @param mode - состояние
 * @param taskId - ИД задачи
 */
const changeMode = (mode: TaskCardModes, taskId: Task["id"]) => {
  if (mode === TaskCardModes.Edit) {
    currentEditTaskId.value = taskId;
  } else {
    currentEditTaskId.value = null;
  }
};
</script>

<style lang="scss">
.tasks {
  &__title {
    font-size: 1.8rem;
    font-weight: 600;
  }

  &__list {
    padding: 2.4rem;
  }

  &__select {
    max-width: 400px;
    margin: 1.2rem auto 0;
  }
}
</style>
