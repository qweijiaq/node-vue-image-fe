<template>
  <div class="app-sidebar-item add">
    <router-link class="link" :to="{ name: 'postCreate' }">
      <AppIcon name="add_a_photo" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '../../../app/components/app-icon.vue';
</script>

<style scoped></style>
