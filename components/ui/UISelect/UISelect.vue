<template>
  <div ref="target" class="ui-select-wrapper">
    <div class="ui-select" @click="toggleList">
      <slot name="text">
        <input
          v-model="value"
          class="ui-select__input"
          readonly
          :placeholder="props.placeholder"
          @blur="handleBlur($event)"
        />
      </slot>
      <ChevronDown
        class="ui-select__icon"
        :class="{ 'ui-select__icon_reverted': isShowList }"
      />
    </div>
    <Transition name="close">
      <ul v-if="isShowList" class="ui-select__list">
        <li
          v-for="item of items"
          :key="item"
          :class="{ 'ui-select__list-item_selected': isSelectedItem(item) }"
          class="ui-select__list-item"
          @click.self="selectItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import type { SelectProps } from "~/components/ui/UISelect/types/SelectProps";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";

const target = ref(null);

onClickOutside(target, (_) => hideList());

defineOptions({
  name: "UISelect",
});

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: "Выберите значение",
});

const selected = defineModel<string>();

/** Показывать список значений */
const isShowList = ref(false);

/** Является ли переданное значение выбранным
 *  @param item Значение из списка
 */
const isSelectedItem = (item: string) => item === value.value;

const { value, handleBlur, handleChange } = useField(props.name, undefined, {
  initialValue: props.modelValue,
});

/** Выбрать значение
 *  @param item Значение из списка
 */
const selectItem = (item: string) => {
  isShowList.value = false;
  handleChange(item);
  selected.value = item;
};

/** Показать/скрыть список значений */
const toggleList = () => {
  isShowList.value = !isShowList.value;
};

/** Скрыть список значений */
const hideList = () => {
  isShowList.value = false;
};
</script>

<style lang="scss">
.ui-select {
  &-wrapper {
    position: relative;
  }

  display: flex;
  align-items: center;
  padding: 1.5rem 1.2rem;
  border: 0.1rem solid rgb(158 161 202 / 35%);
  border-radius: 0.8rem;
  background-color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.6rem;

  &__icon {
    margin-left: auto;
    transition: transform 0.3s ease-in-out;

    &_reverted {
      transform: rotate(180deg);
    }
  }

  &__input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: black;
    cursor: pointer;
    font-weight: 500;

    &::placeholder {
      color: black;
    }
  }

  &__list {
    position: absolute;
    z-index: 999;
    top: calc(100% + 0.5rem);
    width: 100%;
    max-height: 17.5rem;
    padding: 1.5rem;
    border: 0.1rem solid rgb(158 161 202 / 35%);
    border-radius: 0.8rem;
    background-color: white;
    list-style: none;
    overflow-x: auto;

    &-item {
      color: black;
      cursor: pointer;
      font-size: 1.4rem;
      line-height: 1.6rem;
      transition: color 0.25s ease-in-out;

      & + & {
        margin-top: 1.5rem;
      }

      &_selected {
        font-weight: 800;
      }

      &:hover {
        color: rgb(0 0 0 / 50%);
      }
    }
  }
}

.close {
  &-enter-active,
  &-leave-active {
    transition:
      opacity 0.25s ease,
      top 0.25s ease;
  }

  &-enter-from,
  &-leave-to {
    top: calc(100% - 1rem);
    opacity: 0;
  }
}
</style>
