<template>
  <label class="checkbox-field" :for="id">
    <input
      class="input"
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="onChangeInput"
    />
    <div class="icon"></div>
    <div class="text">{{ text }}</div>
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
});

const emits = defineEmits(['update:modelValue']);

const id = computed(() => `${props.name}-${props.value}`);
const isArray = computed(() => Array.isArray(props.modelValue));
const isChecked = computed(() => {
  let isChecked;
  if (isArray.value) {
    isChecked = props.modelValue?.includes(props.value);
  } else {
    isChecked = props.modelValue === props.value;
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
</script>

<style scoped>
@import './styles/checkbox-field.css';
</style>
