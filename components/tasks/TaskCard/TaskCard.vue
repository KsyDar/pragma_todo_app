<template>
  <UIForm
      v-if="props.mode !== TaskCardModes.ReadOnly"
      ref="form"
      class="task-card"
      :validation-schema="validationSchema"
      @submit="save"
  >
    <template #inputs>
      <UIInput
          name="name"
          placeholder="Name"
          label="Name"
          class="task-card__field"
      />
      <UICheckBox
          v-if="props.mode === TaskCardModes.Edit"
          name="status"
          label="Done"
          class="task-card__field"
      />
      <UIInput
          name="description"
          placeholder="Description"
          label="Description"
          component="textarea"
          class="task-card__field"
      />
      <UIInput
          name="email"
          placeholder="Email"
          label="Email"
          class="task-card__field"
      />
    </template>

    <template #buttons="{ isValid }">
      <div class="task-card__actions">
        <UIButton
            v-if="props.mode === TaskCardModes.Edit"
            @click="emits('change-mode', TaskCardModes.ReadOnly)"
        >
          Cancel
        </UIButton>
        <UIButton type="submit" :disabled="!isValid"> Save</UIButton>
      </div>
    </template>
  </UIForm>

  <div v-else class="task-card">
    <div class="task-card__header">
      <h4 class="task-card__title">{{ props.task.name }}</h4>
      <UIButton v-if="userStore.user?.role === UserRole.Admin" transparent @click="emits('change-mode', TaskCardModes.Edit)">
        <Pencil class="task-card__icon"/>
      </UIButton>
    </div>

    <p class="task-card__description">
      <span>
        Status:
        <b class="task-card__description-bold">
          {{ TaskStatus[props.task.status] }}
        </b>
      </span>
    </p>

    <p class="task-card__description">
      <TextBox class="task-card__icon"/>
      <span>{{ props.task.description }}</span>
    </p>

    <p class="task-card__description">
      <EmailOutline class="task-card__icon"/>
      <span>{{ props.task.email }}</span>
    </p>

    <div
        :class="
        'task-card__status task-card__status_' +
        (props.task.status === TaskStatus.Done ? 'done' : 'not-done')
      "
    />
  </div>
</template>

<script setup lang="ts">
import type {Task} from "~/types/task";
import {TaskStatus} from "~/types/taskStatus";
import {TaskCardModes} from "~/components/tasks/TaskCard/types/TaskCardModes";
import EmailOutline from "vue-material-design-icons/EmailOutline.vue";
import TextBox from "vue-material-design-icons/TextBox.vue";
import Pencil from "vue-material-design-icons/Pencil.vue";
import UIInput from "~/components/ui/UIInput/UIInput.vue";
import UICheckBox from "~/components/ui/UICheckBox/UICheckBox.vue";
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import UIForm from "~/components/ui/UIForm/UIForm.vue";
import {toTypedSchema} from "@vee-validate/zod";
import {nativeEnum, object, optional, string} from "zod";
import {v4} from "uuid";
import type {FormRef} from "~/components/ui/UIForm/types/FormProps";
import type {
  TaskCardEmits,
  TaskCardProps,
} from "~/components/tasks/TaskCard/types/TaskCardProps";
import type {GetGenericType} from "~/types/getGenericType";
import {useUserStore} from "~/store/user.store";
import {UserRole} from "~/types/userRole";

const userStore = useUserStore()

defineOptions({name: "TaskCard"});

const props = defineProps<TaskCardProps>();
const emits = defineEmits<TaskCardEmits>();

watch(
    () => props.mode,
    async () => {
      if (props.mode === TaskCardModes.Edit) {
        await nextTick();
        form.value?.form.setValues({
          email: props.task.email,
          status: props.task.status,
          name: props.task.name,
          description: props.task.description,
        });
      }
    },
    {immediate: true},
);

const form = ref<FormRef<FormValueType>>();
const validationSchema = toTypedSchema(
    object({
      name: string().min(3).max(25),
      description: optional(string()),
      email: string().min(1).email(),
      status: optional(nativeEnum(TaskStatus)),
    }),
);

type FormValueType = GetGenericType<typeof validationSchema>;

const save = (values: FormValueType) => {
  const newTask: Task = {
    id: props.task?.id ?? v4(),
    name: values.name || "",
    email: values.email || "",
    status: values.status || TaskStatus.NotDone,
    description: values.description || "",
  };
  emits("save", newTask);
  form.value?.form.resetForm()
};
</script>

<style lang="scss">
$cardPadding: 1.2rem;

.task-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: $cardPadding;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }

  &__title {
    font-size: calc($cardPadding * 2);
  }

  &__icon {
    font-size: 2rem;
  }

  &__field {
    margin-top: $cardPadding;
  }

  &__description {
    display: flex;
    align-items: flex-start;
    margin-top: calc($cardPadding / 2);
    gap: 0.8rem;

    &-bold {
      font-weight: 700;
    }

    & > span + span,
    & > span + input {
      margin-left: 0.6rem;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.2rem;
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
