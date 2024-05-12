<template>
  <li>
    <div class="task-card">
      <h4 class="task-card__header">{{ props.task.name }}</h4>
      <span class="task-card__description">
        {{ props.task.description }}
      </span>
      <span class="task-card__description">
        {{ props.task.email }}
      </span>
      <span class="task-card__description">
        Status: <b class="task-card__description-bold">{{ TaskStatus[props.task.status] }}</b>
      </span>
      <div
          :class="'task-card__status task-card__status_' + (props.task.status === TaskStatus.Done ? 'done' : 'not-done')"/>
    </div>
  </li>
</template>

<script setup lang="ts">
import type {Task} from "~/types/task";
import {TaskStatus} from "~/types/taskStatus";

type Props = {
  task: Task
}
const props = defineProps<Props>()
</script>

<style lang="scss">
$cardPadding: 1.2rem;

.task-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: $cardPadding;

  &__header {
    font-size: calc($cardPadding * 2);
  }

  &__description {
    margin-top: calc($cardPadding / 2);

    &-bold {
      font-weight: 700;
    }
  }


  &__status {
    position: absolute;
    top: calc($cardPadding / 2);
    left: calc(-1 * ($cardPadding / 2));
    width: 6px;
    height: calc(100% - $cardPadding);
    border-radius: 15%;

    &_done {
      background: green;
    }

    &_not-done {
      background: red;
    }
  }
}
</style>
