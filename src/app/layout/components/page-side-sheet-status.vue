<template>
  <div class="page-side-sheet-status">
    <div class="icon">
      <AppIcon name="error_outline" />
    </div>
    <div class="content">{{ props.content }}</div>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '../../components/app-icon.vue';

const props = defineProps({
  content: {
    type: String,
  },
});
</script>

<style scoped>
@import './styles/page-side-sheet-status.css';
</style>
