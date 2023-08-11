<template>
  <button :class="submitButtonClasses" @click="onClickSubmitButton">
    {{ submitButtonText }}
  </button>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '提交',
  },

  unsaved: {
    type: Boolean,
  },
});

const emits = defineEmits(['submit']);

const submitButtonText = computed(() => props.text);

const submitButtonClasses = computed(() => [
  'button',
  { outline: props.unsaved },
]);
const onClickSubmitButton = () => {
  emits('submit');
};
</script>

<style scoped>
@import './styles/submit-button.css';
</style>
