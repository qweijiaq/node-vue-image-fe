<template>
  <div class="app-sidebar-item dashboard">
    <router-link class="link" :to="dashboardLinkTo">
      <AppIcon name="analytics" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppIcon from '../../components/app-icon.vue';

const dashboardLinkTo = computed(() => ({
  name: 'dashboardAccessCount',
}));
</script>

<style scoped>
@import './styles/app-sidebar-item-dashboard.css';
</style>
