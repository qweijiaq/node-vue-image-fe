<template>
  <div class="app-sidebar">
    <AppSidebarItemBrand />
    <AppSidebarItemUser />
    <AppSidebarItemPopular />
    <AppSidebarItemDashboard />
    <AppSidebarItemAdd />
    <AppSidebarItemTheme />
  </div>
</template>

<script lang="ts" setup>
import AppSidebarItemBrand from './components/app-sidebar-item-brand.vue';
import AppSidebarItemPopular from './components/app-sidebar-item-popular.vue';
import AppSidebarItemAdd from './components/app-sidebar-item-add.vue';
import AppSidebarItemTheme from './components/app-sidebar-item-theme.vue';
import AppSidebarItemUser from './components/app-sidebar-item-user.vue';
import AppSidebarItemDashboard from './components/app-sidebar-item-dashboard.vue';
</script>

<style scoped>
@import url('./styles/app-sidebar.css');
</style>
