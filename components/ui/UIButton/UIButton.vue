<template>
  <button
    :type="props.type"
    :class="['ui-button', { 'ui-button_transparent': props.transparent }]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "~/components/ui/UIButton/types/ButtonProps";

defineOptions({ name: "UIButton" });

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "button",
  disabled: false,
});
</script>

<style scoped lang="scss">
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
    background-color: white;
    color: #298e46;
  }

  &:not(.ui-button_transparent) {
    background-color: #298e46;
    color: white;
  }

  &:disabled {
    border-color: rgb(27 31 35 / 10%);
    cursor: default;
  }

  &.ui-button_transparent:disabled {
    color: #94d3a2;
  }

  &:not(.ui-button_transparent):disabled {
    background-color: #94d3a2;
    color: rgb(255 255 255 / 80%);
  }

  &:focus:not(:disabled) {
    box-shadow: rgb(46 164 79 / 40%) 0 0 0 3px;
    outline: none;
  }

  &.ui-button_transparent:not(:disabled):hover {
    background-color: #f6f8fa;
  }

  &:not(.ui-button_transparent, :disabled):hover {
    background-color: #2c974b;
  }

  &:focus:not(:focus-visible, .focus-visible) {
    box-shadow: none;
    outline: none;
  }
}
</style>
