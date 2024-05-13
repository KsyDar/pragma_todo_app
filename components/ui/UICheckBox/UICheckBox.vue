<template>
  <label class="ui-checkbox">
    <input type="checkbox" :value="value" @blur="handleBlur($event)" @change="change($event)">
    {{ props.label }}
  </label>
</template>

<script setup lang="ts">
import type {CheckBoxProps} from "~/components/ui/UICheckBox/types/CheckBoxProps";
import {TaskStatus} from "~/types/taskStatus";

defineOptions({name: 'UICheckBox'})

const props = defineProps<CheckBoxProps>()

const {value, handleBlur, handleChange} = useField<TaskStatus>(
    props.name,
    undefined,
    {
      checkedValue: TaskStatus.Done,
      uncheckedValue: TaskStatus.NotDone,
      type: 'checkbox',
    }
);
/**
 * Изменение значения чекбокса
 * @param event - событие
 */
const change = (event: Event) => {
  handleChange(event);
};
</script>
