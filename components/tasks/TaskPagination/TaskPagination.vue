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

const startTaskNumber = ref(1)
const endTaskNumber = computed(() => {
  if (props.isLastPage) {
    return props.total
  }
  return startTaskNumber.value + 2
})

const prev = () => {
  emits('prev')
  startTaskNumber.value = props.isFirstPage ? 1 : startTaskNumber.value - 3
}

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

    &_selected {
      color: #298e46;
    }
  }
}
</style>
