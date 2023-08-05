<template>
  <div class="field">
    <textarea
      class="input textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target?.value.trim())"
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

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
@import './styles/textarea-field.css';
</style>
