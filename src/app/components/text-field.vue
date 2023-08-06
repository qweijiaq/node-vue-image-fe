<template>
  <div class="field">
    <input
      class="input text"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="onInputText"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
  },
});

const value = ref('');

const emits = defineEmits(['update:modelValue', 'dirty']);

const onInputText = (event: any) => {
  const _value = event.target.value.trim();
  if (value.value !== _value) {
    emits('dirty');
  }
  value.value = _value;
  emits('update:modelValue', event.target?.value.trim())
};
</script>

<style scoped></style>
