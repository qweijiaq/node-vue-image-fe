<template>
  <div class="app-notification-message">
    <div class="icon">
      <appIcon :name="messageIcon" />
    </div>
    <div class="content">{{ props.message?.content }}</div>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '@/app/components/app-icon.vue';
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: Object,
  },
});

const messageIcon = computed(() =>
  props.message?.icon ? props.message.icon : 'info',
);
</script>

<style scoped>
@import url('./styles/app-notification-message.css');
</style>
