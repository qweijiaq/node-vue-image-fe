<template>
  <label :class="checkboxFieldClasses" :for="id">
    <input
      class="input"
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="onChangeInput"
    />
    <div class="icon" v-if="useIcon"></div>
    <div class="text">{{ text }}</div>
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },

  type: {
    type: String,
    default: 'checkbox',
  },

  name: {
    type: String,
  },

  value: {
    type: String,
  },

  text: {
    type: String,
  },

  useIcon: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']);

const id = computed(() => `${props.name}-${props.value}`);
const isArray = computed(() => Array.isArray(props.modelValue));
const isChecked = computed(() => {
  let isChecked;
  if (isArray.value) {
    isChecked = props.modelValue?.includes(props.value);
  } else {
    isChecked = (props.modelValue as any) === props.value;
  }

  return isChecked;
});

const onChangeInput = (event: any) => {
  let value = event.target.value;

  if (isArray.value) {
    if (isChecked.value) {
      value = props.modelValue?.filter((item) => item !== value);
    } else {
      value = [...props.modelValue, value];
    }
  }

  emits('update:modelValue', value);
};

const checkboxFieldClasses = computed(() => [
  'checkbox-field',
  { active: isChecked.value },
]);
</script>

<style scoped>
@import './styles/checkbox-field.css';
</style>
