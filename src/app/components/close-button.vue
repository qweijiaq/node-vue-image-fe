<template>
  <div :class="['close-button', props.align]">
    <button class="button basic" @click="$emit('click')">
      <appIcon name="close" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import appIcon from './app-icon.vue';

const props = defineProps({
  align: {
    type: String,
  },
});

const emits = defineEmits(['click']);
</script>

<style scoped>
@import url('../../app/styles/close-button.css');
</style>
