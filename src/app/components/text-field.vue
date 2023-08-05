<template>
  <div class="field">
    <input
      class="input text"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target?.value.trim())"
    />
  </div>
</template>

<script lang="ts" setup>
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

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped></style>
