<template>
  <div class="app-sidebar-item popular">
    <router-link class="link" :to="{ name: 'postIndexPopular' }">
      <appIcon name="local_fire_department" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '../../../app/components/app-icon.vue';
</script>

<style scoped></style>
