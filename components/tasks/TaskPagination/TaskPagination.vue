<template>
  <div class="task-pagination">
    <UIButton
        :disabled="props.isFirstPage"
        class="task-pagination__button"
        @click="prev"
    >
      <ChevronLeft class="task-pagination__icon"/>
    </UIButton>

    <span class="task-pagination__page">{{ startTaskNumber }} - {{ endTaskNumber }}</span>

    <UIButton
        :disabled="props.isLastPage"
        class="task-pagination__button"
        @click="next"
    >
      <ChevronRight class="task-pagination__icon"/>
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import type {
  TaskPaginationEmits,
  TaskPaginationProps,
} from "./types/TaskPaginationProps";

defineOptions({name: "TaskPagination"});

const props = defineProps<TaskPaginationProps>();
const emits = defineEmits<TaskPaginationEmits>();

/** Порядковый номер первой задачи на странице */
const startTaskNumber = ref(1)
/** Порядковый номер последней задачи на странице */
const endTaskNumber = computed(() => {
  if (props.isLastPage) {
    return props.total
  }
  return startTaskNumber.value + 2
})

/**
 * Переход на предыдущую страницу
 */
const prev = () => {
  emits('prev')
  startTaskNumber.value = props.isFirstPage ? 1 : startTaskNumber.value - 3
}
/**
 * Переход на следующую страницу
 */
const next = () => {
  emits('next')
  startTaskNumber.value = props.isLastPage ? props.total : startTaskNumber.value + 3
}

watch(() => props.currentPage, val => {
  if (val === 1) {
    startTaskNumber.value = 1
  }
})
</script>

<style lang="scss">
.task-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1.2rem;

  &__icon {
    font-size: 2rem;
  }

  &__page {
    font-size: 2.4rem;
    transition: color 0.3s ease-in-out;
  }
}
</style>
