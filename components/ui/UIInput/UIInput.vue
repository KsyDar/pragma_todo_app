<template>
  <input v-model="model" class="ui-input" :type="props.type" :placeholder="props.placeholder">
</template>

<script setup lang="ts">
import type { InputProps } from "~/components/ui/UIInput/types/InputProps";

defineOptions({name: 'UIInput'})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const model = defineModel<string>({default: ''})
</script>

<style lang="scss">
.ui-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid rgb(0 0 0 / 30%);
  border-radius: .4rem;
  color: black;
  font-size: 1.3rem;
  transition: box-shadow .5s ease;

  &:focus {
    box-shadow: inset 0 0 0 32px #fff ,0 0 0 2px #0969da;
  }
}
</style>
