<template>
  <div class="field">
    <button :class="['button', props.size, props.type]" @click="$emit('click')">
      {{ props.text }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
  },
  size: {
    type: String,
  },
  type: {
    type: String,
  },
});

const emits = defineEmits(['click']);
</script>

<style scoped></style>
