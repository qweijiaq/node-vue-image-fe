<template>
  <div class="field">
    <textarea
      class="input textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInputTextarea"
      @change="onChangeTextarea"
    >
    ></textarea
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  rows: {
    type: Number,
    default: 2,
  },
});

const value = ref('');

const emits = defineEmits(['update:modelValue', 'dirty']);

const onInputTextarea = (event: any) => {
  const _value = event.target.value.trim();
  if (value.value !== _value) {
    emits('dirty');
  }
  value.value = _value;
  emits('update:modelValue', event.target?.value.trim());
};
</script>

<style scoped>
@import './styles/textarea-field.css';
</style>
