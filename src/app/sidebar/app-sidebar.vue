<template>
  <div class="app-sidebar">
    <appSidebarItemBrand />
    <appSidebarItemUser />
    <appSidebarItemPopular />
    <appSidebarItemAdd />
    <appSidebarItemTheme />
  </div>
</template>

<script lang="ts" setup>
import appSidebarItemBrand from './components/app-sidebar-item-brand.vue';
import appSidebarItemPopular from './components/app-sidebar-item-popular.vue';
import appSidebarItemAdd from './components/app-sidebar-item-add.vue';
import appSidebarItemTheme from './components/app-sidebar-item-theme.vue';
import appSidebarItemUser from './components/app-sidebar-item-user.vue';
</script>

<style scoped>
@import url('./styles/app-sidebar.css');
</style>
