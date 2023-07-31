<template>
  <div class="textarea-field">
    <textarea
      class="input textarea"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
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
});

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
@import './styles/textarea-field.css';
</style>
