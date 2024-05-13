<template>
  <form
    role="form"
    class="ui-form"
    @submit.prevent="submit"
    @reset="form.resetForm"
  >
    <slot name="inputs" />
    <slot name="buttons" :is-valid="form.meta.value.valid" />
  </form>
</template>

<script generic="T extends GenericObject" setup lang="ts">
import type { GenericObject } from "vee-validate";
import type {
  FormEmits,
  FormProps,
} from "~/components/ui/UIForm/types/FormProps";

defineOptions({
  name: "UIForm",
});

const props = defineProps<FormProps<T>>();
const emits = defineEmits<FormEmits<T>>();

const form = useForm<T>({
  validationSchema: props.validationSchema,
  validateOnMount: props.validateOnMount,
  initialTouched: props.initialTouched,
  initialErrors: props.initialErrors,
  initialValues: props.initialValues,
  keepValuesOnUnmount: props.keepValues,
});
defineExpose({ form });

const submit = form.handleSubmit(
  (values) => {
    emits("submit", values);
  },
  () => {
    emits("invalid-submit");
  },
);
</script>
