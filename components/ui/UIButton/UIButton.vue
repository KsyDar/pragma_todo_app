<template>
  <button
      :type="props.type"
      :class="['ui-button', { 'ui-button_transparent': props.transparent }]"
      :disabled="props.disabled"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
import type {ButtonProps} from "~/components/ui/UIButton/types/ButtonProps";

defineOptions({name: "UIButton"});

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "button",
  disabled: false,
});
</script>

<style scoped lang="scss">
@use 'assets/variables/colors' as *;

.ui-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border-width: 0;
  border-radius: 8px;
  margin: 0;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  transition: all 200ms;

  &.ui-button_transparent {
    background-color: $secondaryMainColor;
    color: $buttonColor;
  }

  &:not(.ui-button_transparent) {
    background-color: $buttonColor;
    color: $secondaryMainColor;
  }

  &:disabled {
    border-color: $borderColor;
    cursor: default;
  }

  &.ui-button_transparent:disabled {
    color: $disabledColor;
  }

  &:not(.ui-button_transparent):disabled {
    background-color: $disabledColor;
    color: rgb(255 255 255 / 80%);
  }

  &:focus:not(:disabled) {
    box-shadow: $focusColor 0 0 0 3px;
    outline: none;
  }

  &.ui-button_transparent:not(:disabled):hover {
    background-color: $primaryMainColor;
  }

  &:not(.ui-button_transparent, :disabled):hover {
    background-color: $hoverColor;
  }

  &:focus:not(:focus-visible, .focus-visible) {
    box-shadow: none;
    outline: none;
  }
}
</style>
