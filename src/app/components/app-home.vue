<template>
  <component :is="postIndex"></component>
</template>

<script lang="ts" setup>
import postIndex from '../../post/index/post-index.vue';
</script>
