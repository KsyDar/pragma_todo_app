<template>
  <button :type="props.type" class="ui-button">
    <slot/>
  </button>
</template>

<script setup lang="ts">
import type {ButtonProps} from "~/components/ui/UIButton/types/ButtonProps";

defineOptions({name: 'UIButton'})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button'
})
</script>

<style lang="scss">
.ui-button {
  display: inline-block;
  padding: 1rem 1.2rem;
  border-width: 0;
  border-radius: 8px;
  margin: 0;
  background-color: #298e46;
  color: white;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  transition: all 200ms;

  &:hover {
    background-color: #2c974b;
  }

  &:focus {
    box-shadow: rgb(46 164 79 / 40%) 0 0 0 3px;
    outline: none;
  }

  &:disabled {
    border-color: rgb(27 31 35 / 10%);
    background-color: #94d3a2;
    color: rgb(255 255 255 / 80%);
    cursor: default;
  }

  &:focus:not(:focus-visible, .focus-visible) {
    box-shadow: none;
    outline: none;
  }
}
</style>
