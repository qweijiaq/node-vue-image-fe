<template>
  <div class="app-notification">
    <transition-group name="app-notification-message">
      <appNotificationMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import appNotificationMessage from './components/app-notification-message.vue';

const store = useStore();

const messages = computed(() => store.getters['notification/messages']);
</script>

<style scoped>
.app-notification {
  position: fixed;
  bottom: 64px;
  right: 64px;
  z-index: 666;
}
</style>
