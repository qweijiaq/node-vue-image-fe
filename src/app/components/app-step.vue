<template>
  <div class="app-step">
    <div class="number">
      {{ props.number }}
    </div>
    <div class="text">
      {{ props.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  // 步骤数
  number: {
    type: Number,
  },

  // 步骤标题
  title: {
    type: String,
  },
});
</script>

<style scoped>
@import './styles/app-step.css';
</style>
