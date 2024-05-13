<template>
  <label :class="['ui-input', { 'ui-input_error': !!errorMessage }]">
    <span>{{ errorMessage ?? props.label }}</span>
    <component
        :is="props.component"
        :value="value"
        :type="props.component === 'input' ? props.type : undefined"
        :placeholder="props.placeholder"
        :rows="props.component === 'input' ? undefined : 4"
        class="ui-input__field"
        @blur="handleBlur($event)"
        @change="change($event)"
    />
  </label>
</template>

<script setup lang="ts">
import type {InputProps} from "~/components/ui/UIInput/types/InputProps";

defineOptions({name: "UIInput"});

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  component: "input",
});

const {value, errorMessage, handleBlur, handleChange} = useField<string>(
    props.name,
    undefined,
);
/**
 * Изменение значения поля
 * @param event - событие
 */
const change = (event: Event) => {
  handleChange(event);
};
</script>

<style lang="scss">
@use 'assets/variables/colors' as *;

.ui-input {
  flex-grow: 1;

  &__field {
    width: 100%;
    padding: 1rem;
    border: 1px solid rgb(0 0 0 / 30%);
    border-radius: 0.4rem;
    margin-top: 0.4rem;
    color: black;
    font-size: 1.3rem;
    resize: none;
    transition: all 0.5s ease;

    &:focus {
      box-shadow: inset 0 0 0 32px $secondaryMainColor,
      0 0 0 2px $blueColor;
    }
  }

  &_error > &__field,
  &_error > span {
    border-color: $notDoneColor;
    color: $notDoneColor;
  }
}
</style>
